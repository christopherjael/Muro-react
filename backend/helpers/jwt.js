const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, secret, { expiresIn: '2h' });

  return token;
};

const validateToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = {
  generateToken,
  validateToken,
};
