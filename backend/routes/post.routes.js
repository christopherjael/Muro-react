const express = require('express');
const validationFields = require('./../middlewares/validate-fields.js');
const { param, body } = require('express-validator');
const {
  getAllPosts,
  createPosts,
  deletePosts,
  updatePosts,
} = require('./../controllers/post.controller');

const router = express.Router();

router.get('/', getAllPosts);

router.post(
  '/',
  [
    body(['title', 'content'])
      .isString()
      .withMessage('title and content must be a string'),
    body(['title', 'content'])
      .not()
      .isEmpty()
      .trim()
      .withMessage('title and content can be empty'),
    validationFields,
  ],
  createPosts
);

router.put(
  '/:doc',
  [
    param('doc').not().isEmpty().withMessage('doc is required'),
    body(['title', 'content'])
      .isString()
      .withMessage('title and content must be a string'),
    body(['title', 'content'])
      .not()
      .isEmpty()
      .trim()
      .withMessage('title and content can be empty'),
    validationFields,
  ],
  updatePosts
);

router.delete(
  '/:doc',
  [
    param('doc').not().isEmpty().withMessage('doc is required'),
    validationFields,
  ],
  deletePosts
);

module.exports = router;
