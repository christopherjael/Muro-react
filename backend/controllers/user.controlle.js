const db = require('./../firebase/firebase');
const { Timestamp } = require('firebase-admin/firestore');
const { encrypter } = require('../helpers/crypter.js');
const getAllUsers = async (req, res, next) => {
  const userRef = await db.collection('users').get();

  const data = userRef.docs.map((doc) => ({
    id: doc.id,
    username: doc.data().username,
    name: doc.data().name,
    lastName: doc.data().lastname,
    password: doc.data().password,
    createAt: doc.data().createdat._seconds,
    updateAt: doc.data().updatedat._seconds,
  }));

  res.status(200).json({ status: 'ok', data });
};

const createUsers = async (req, res, next) => {
  const { username, name, lastname, password } = req.body;

  await db.collection('users').add({
    username,
    name,
    lastname,
    password: encrypter(password),
    createdat: Timestamp.now(),
    updatedat: Timestamp.now(),
  });

  res.status(201).json({
    status: 'ok',
    msg: 'Post added successfully',
  });
};

const updateUsers = async (req, res, next) => {
  const { doc } = req.params;
  const { name, lastname, password } = req.body;

  await db.collection('users').doc(doc).update({
    title,
    content,
    updatedat: Timestamp.now(),
  });

  res.status(200).json({
    status: 'ok',
    msg: 'Post updated successfully',
  });
};

const deleteUsers = async (req, res, next) => {
  const { doc } = req.params;

  await db.collection('users').doc(doc).delete();

  res.status(200).json({
    status: 'ok',
    msg: 'Posts deleted successfully',
  });
};

module.exports = { getAllUsers, createUsers, updateUsers, deleteUsers };
