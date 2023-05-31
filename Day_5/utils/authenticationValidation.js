const Joi = require("joi");
const AppError = require("../utils/AppError");

//login Scehma
const loginScehma = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

//singup Scehma
const signupScehma = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
  });

const loginValidation = (req, res, next) => {
  const { error } = loginScehma.validate(req.body);
  if (error) {
    return next(new AppError(error.message, 400, error.details));
  }
  next();
};

const signupValidation = (req, res, next) => {
    const { error } = signupScehma.validate(req.body);
    if (error) {
      return next(new AppError(error.message, 400, error.details));
    }
    next();
  };

module.exports = {loginValidation, signupValidation}