const validator = require('validator');

/**
 * @param {object} data
 * @return {object}
 */

const signupValidation = data => {
  let { name, username, email, password } = data;

  // trim all input
  name = name.trim();
  username = username.trim();
  password = password.trim();
  email = email.trim();

  const validationError = [];

  // name validation
  if (validator.isEmpty(name)) {
    const error = new Error('Name is required');
    validationError.push(error);
  } else if (!validator.isLength(name, { min: 3, max: 20 })) {
    const error = new Error('Name should be between 3 to 20 characters');
    validationError.push(error);
  }

  // username validation
  if (validator.isEmpty(username)) {
    const error = new Error('Username is required');
    validationError.push(error);
  } else if (!validator.isLength(username, { min: 3, max: 10 })) {
    const error = new Error('Username should be between 3 to 10 characters');
    validationError.push(error);
  }

  // email validation
  if (validator.isEmpty(email)) {
    const error = new Error('Email is required.');
    validationError.push(error);
  } else if (!validator.isEmail(email)) {
    const error = new Error('Email is not valid.');
    validationError.push(error);
  }

  // password validation
  if (validator.isEmpty(password)) {
    const error = new Error('Password is required.');
    validationError.push(error);
  } else if (!validator.isLength(password, { min: 6 })) {
    const error = new Error('Password should be at least 6 characters.');
    validationError.push(error);
  }

  return validationError.length > 0
    ? { errors: validationError }
    : { name, username, email, password };
};

module.exports = signupValidation;
