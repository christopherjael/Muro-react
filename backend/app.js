const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const paths = {
  post: '/api/posts',
  auth: '/api/auth',
  user: '/api/users',
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(paths.post, require('./routes/post.routes.js'));
app.use(paths.user, require('./routes/user.routes.js'));
app.use(paths.auth, require('./routes/auth.routes.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log('Server lintening on port ', PORT);
});
