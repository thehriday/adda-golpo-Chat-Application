const validator = require('validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

/**
 * @param {object} data
 * @return {object}
 */

const signupValidation = async data => {
  let { name, username, email, password } = data;

  // trim all input
  name = name.trim();
  username = username.trim().toLowerCase();
  password = password.trim();
  email = email.trim().toLowerCase();

  const validationError = [];

  // name validation
  if (validator.isEmpty(name)) {
    validationError.push('Name is required.');
  } else if (!validator.isLength(name, { min: 3, max: 20 })) {
    validationError.push('Name should be between 3 to 20 characters.');
  }

  // username validation
  if (validator.isEmpty(username)) {
    validationError.push('Username is required.');
  } else if (!validator.isLength(username, { min: 3, max: 15 })) {
    validationError.push('Username should be between 3 to 15 characters.');
  } else if (validator.isNumeric(username)) {
    validationError.push('Username should be contain at least one character.');
  } else if (username.indexOf(' ') !== -1) {
    validationError.push('Username cannot contain space');
  } else {
    const isUserNameExists = await User.findOne({ username });
    if (isUserNameExists) {
      validationError.push('Username is already taken.');
    }
  }

  // email validation
  if (validator.isEmpty(email)) {
    validationError.push('Email is required.');
  } else if (!validator.isEmail(email)) {
    validationError.push('Email is not valid.');
  } else {
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      validationError.push('Email is already taken.');
    }
  }

  // password validation
  if (validator.isEmpty(password)) {
    validationError.push('Password is required.');
  } else if (!validator.isLength(password, { min: 6 })) {
    validationError.push('Password should be at least 6 characters.');
  } else {
    password = bcrypt.hashSync(password, 10);
  }

  return validationError.length > 0
    ? { errors: validationError }
    : { name, username, email, password };
};

module.exports = signupValidation;
