const express = require('express');
const validationFields = require('./../middlewares/validate-fields.js');
const userExists = require('./../middlewares/user-exists.js');
const { param, body } = require('express-validator');
const {
  getAllUsers,
  createUsers,
  deleteUsers,
  updateUsers,
} = require('./../controllers/user.controlle');

const router = express.Router();

router.get('/', getAllUsers);

router.post(
  '/',
  [
    userExists,
    body(['name', 'lastname', 'password', 'username'])
      .isString()
      .withMessage('all fields must be a string'),
    body(['name', 'lastname', 'password', 'username'])
      .not()
      .isEmpty()
      .trim()
      .withMessage('all fields are required'),
    validationFields,
  ],
  createUsers
);

router.put('/:doc', updateUsers);

router.delete('/:doc', deleteUsers);

module.exports = router;
