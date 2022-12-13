const { doc } = require('../firebase/firebase');
const db = require('../firebase/firebase');
const { decrypter, descrypter } = require('../helpers/crypter');
const { generateToken } = require('../helpers/jwt');

const login = async (req, res) => {
  const { username, password } = req.body;
  const userRef = db.collection('users');
  const snapshot = await userRef.where('username', '==', username).get();

  if (snapshot.empty) {
    return res
      .status(400)
      .json({ status: 'Bad Request', msg: 'username not found' });
  }

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  if (!descrypter(password, user[0].data.password)) {
    return res
      .status(400)
      .json({ status: 'Bad Request', msg: 'Invalid username or password' });
  }
  const token = generateToken(user[0].id);

  return res.json({ status: 'ok', msg: 'login successful', token, username });
};

module.exports = { login };
