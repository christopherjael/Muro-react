const express = require('express');
const validationFields = require('./../middlewares/validate-fields.js');
const userExists = require('./../middlewares/user-exists.js');
const { param, body } = require('express-validator');
const { login } = require('./../controllers/auth.controller');

const router = express.Router();

router.post(
  '/login',
  [
    body(['username', 'password'])
      .notEmpty()
      .withMessage('Username and password is required')
      .isString()
      .withMessage('username and password should be strings'),
    validationFields,
  ],
  login
);

//router.post('/signup', getAllUsers);

module.exports = router;
