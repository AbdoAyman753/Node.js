const bcrypt = require('bcrypt');
const AppError = require("../utils/AppError");
const User = require("../models/user");
const { response } = require('express');
const jwt = require('jsonwebtoken');


const signUp = async (req, res,next) => {
    // try {
    const { email, password } = req.body;
    if(!email || !password){
      // const error = new Error('email and password are required');
      // err.status = 'error'
      // error.statusCode = 400;
      // return next(error)
      next(new AppError('email and password required',400));
    }
    // const userCreated = await User.create({email,password});
    const hashedPassword = await bcrypt.hash(password, 7);
    const userCreated = new User({ email, password:hashedPassword });
    await userCreated.save();
    userCreated.password = undefined;
    res.send(userCreated);
    // } catch (err) {
    //   console.log('err', err)
    //   next(err);
    // }
  }

  const login = async   (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        new AppError('email and password required',400);
    }
    const user = await User.findOne({email}).select('+password');
    if(!user) { return new AppError('user not found',404)}
    const isMatched = user.checkPassword(password);
    if(!isMatched) { return next(new AppError('Invalid user',400))};
    user.password = undefined;
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
    res.send({token,user});
  }

  const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.send(users);
  }

  const getUserById = async (req, res,next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user) return next(new AppError('user not found',404))
    res.send(user);
  }

  const updateUserById = async(req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    await User.findByIdAndUpdate(id,{email, password});
  }

  const deleteUserById = async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
  }
  module.exports = {signUp, login, getUsers, getUserById, updateUserById, deleteUserById};