const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypter = (password) => {
  const hash = bcrypt.hashSync(password, saltRounds);

  return hash;
};

const descrypter = (password, hash) => {
  const match = bcrypt.compareSync(password, hash);

  return match;
};

module.exports = {
  encrypter,
  descrypter,
};
