const express = require('express');
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);
    if(!token) {next(new AppError("Invalid token"));}
    const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log('id:',id);
    req.body.owner = id;
    next();
}

module.exports = {tokenAuth};