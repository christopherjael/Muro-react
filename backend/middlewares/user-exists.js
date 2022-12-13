const db = require('../firebase/firebase');

module.exports = userExists = async (req, res, next) => {
  const { username } = req.body;
  const userRef = db.collection('users');
  const snapshot = await userRef.where('username', '==', username).get();
  if (!snapshot.empty) {
    return res.status(400).json({
      status: 'Bad Request',
      msg: 'username is already used',
    });
  }

  next();
};
