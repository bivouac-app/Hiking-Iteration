const mongoose = require('mongoose');
const express = require('express');
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const client = new MongoClient(global.__MONGO_URI__);
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');
const User = require('../server/models/User');
const userRoute = require('../server/routers/userRouter');
const hikeRoute = require('../server/routers/hikeRouter');
const { Unstable_Grid2 } = require('@mui/material');

// //helper function for temp server instance:
const createServer = () => {
  const app = express();
  app.use(express.json());
  console.log('inside createServer pre routes');
  app.use('/api/users', userRoute);
  app.use('/api/hikes', hikeRoute);
  console.log('inside createServer pre return');
  return app;
};
const testApp = createServer();

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('testing user routes', () => {
  //before testing /getall route, create a temp user record:
  it('gets all users', async () => {
    const user1 = await User.create({
      firstName: 'user1First',
      lastName: ' user1Last',
      location: 'user1ville',
      email: 'user1@user1.com',
      password: 'user1pass',
    });
    const user2 = await User.create({
      firstName: 'user2First',
      lastName: ' user2Last',
      location: 'user2ville',
      email: 'user2@user2.com',
      password: 'user2pass',
    });

    await supertest(testApp)
      .get('/api/users/getall')
      .expect(200)
      .then((response) => {
        //check response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(2);
        console.log('in expect statements1');
        //check response data
        expect(response.body[0]._id).toBe(user1.id);
        expect(response.body[0].firstName).toBe(user1.firstName);
        expect(response.body[0].lastName).toBe(user1.lastName);
        expect(response.body[0].location).toBe(user1.location);
        expect(response.body[0].email).toBe(user1.email);
        expect(response.body[0].password).toBe(user1.password);
        expect(response.body[1]._id).toBe(user2.id);
        expect(response.body[1].firstName).toBe(user2.firstName);
        expect(response.body[1].lastName).toBe(user2.lastName);
        expect(response.body[1].location).toBe(user2.location);
        expect(response.body[1].email).toBe(user2.email);
        expect(response.body[1].password).toBe(user2.password);
        console.log('in expect statements2');
      });
  });

  it('tests POST to /api/posts/new', async () => {
    const post = {
      title: 'Post 1',
      content: 'Lorem ipsum',
    };

    await supertest(testApp)
      .post('/api/posts/new')
      .send(post)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.author_id).toBeTruthy();
        expect(response.body.content).toBe(post.content);

        // Check the data in the database
        const savedPost = await Post.findOne({ _id: response.body.author_id });
        expect(savedPost).toBeTruthy();
        expect(savedPost.content).toBe(post.content);
      });
  });

  test('DELETE /api/posts/:id', async () => {
    const post = await Post.create({
      title: 'Post 2',
      content: 'Some stuff',
    });

    await supertest(app)
      .delete('/api/posts/' + post.id)
      .expect(204)
      .then(async () => {
        expect(await Post.findOne({ _id: post.id })).toBeFalsy();
      });
  });

  it('tests POST to /api/get-hikes', async () => {
    const hike = {
      user_id: user1.id,
      title: 'test hike',
      difficulty: 5,
    };
    await supertest(testApp)
      .post('/api/get/hikes')
      .send(hike)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.userid).toBeTruthy();
        expect(response.locals.hikes).toBe(hike);

        // Check the data in the database
        const savedHike = await Hike.find({ userid: response.body.userid });
        expect(savedHike).toBeTruthy();
        expect(savedHike.title).toBe(hike.title);
      });
  });
});
