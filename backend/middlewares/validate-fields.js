const { validationResult } = require('express-validator');

module.exports = validationFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};
