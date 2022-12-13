const db = require('./../firebase/firebase');
const { Timestamp } = require('firebase-admin/firestore');
const { validateToken } = require('./../helpers/jwt');

const getAllPosts = async (req, res, next) => {
  const postRef = await db.collection('posts').get();

  const data = postRef.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content,
    postedBy: doc.data().postedby,
    createAt: doc.data().createdat._seconds,
    updateAt: doc.data().updatedat._seconds,
  }));

  res.status(200).json({ status: 'ok', data });
};

const createPosts = async (req, res, next) => {
  const { title, content } = req.body;

  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ status: 'Unauthorized', msg: 'Token is required' });
  }

  const userID = validateToken(token).payload;
  const user = await db.collection('users').doc(userID.toString()).get();

  console.log(user.data());

  await db.collection('posts').add({
    title,
    content,
    postedby: user.data().username,
    createdat: Timestamp.now(),
    updatedat: Timestamp.now(),
  });

  res.status(201).json({
    status: 'ok',
    msg: 'Post added successfully',
  });
};

const updatePosts = async (req, res, next) => {
  const { doc } = req.params;
  const { title, content } = req.body;

  await db.collection('posts').doc(doc).update({
    title,
    content,
    updatedat: Timestamp.now(),
  });

  res.status(200).json({
    status: 'ok',
    msg: 'Post updated successfully',
  });
};

const deletePosts = async (req, res, next) => {
  const { doc } = req.params;

  await db.collection('posts').doc(doc).delete();

  res.status(200).json({
    status: 'ok',
    msg: 'Posts deleted successfully',
  });
};

module.exports = { getAllPosts, createPosts, updatePosts, deletePosts };
