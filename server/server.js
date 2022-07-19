require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const hikeRouter = require('./routers/hikeRouter');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/hikes', hikeRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

mongoose.connect(process.env.MONGO_URI, () =>
  console.log('Connected to Mongo DB'),
);

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});

module.exports = app;
