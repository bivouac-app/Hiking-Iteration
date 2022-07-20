const mongoose = require('mongoose');
const express = require('express');
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const client = new MongoClient(global.__MONGO_URI__);
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');
const User = require('../server/models/usersModel');
const userRoute = require('../server/routes/userRoute');
const hikeRoute = require('../server/routes/hikeRoute');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

// //helper function for temp server instance:
function createServer() {
  const app = express();
  app.use(express.json());
  console.log('inside createServer pre routes');
  app.use('/api/users', userRoute);
  app.use('/api/hikes', hikeRoute);
  console.log('inside createServer pre return');
  return app;
}
console.log(createServer);

const testApp = createServer();

//before testing get all user route, create a temp user record:
test('GET /api/users', async () => {
  const user = await User.create({
    firstName: 'supertestFirst',
    lastName: 'supertestLast',
    location: 'superville',
    email: 'super@supertest.com',
    password: 'supertest',
  });

  //test get all users route:
  await supertest(testApp)
    .get('/api/users/getall')
    .expect(200)
    .then((response) => {
      //check response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      console.log('in expect statements1');
      //check response data
      expect(response.body[0]._id).toBe(user.id);
      expect(response.body[0].firstName).toBe(user.firstName);
      expect(response.body[0].lastName).toBe(user.lastName);
      expect(response.body[0].location).toBe(user.location);
      expect(response.body[0].email).toBe(user.email);
      expect(response.body[0].password).toBe(user.password);
      console.log('in expect statements2');
    });
});

//before testing login route, create temp user record:
test('POST /api/users', async () => {
  const user = await User.create({
    firstName: 'supertestFirst',
    lastName: 'supertestLast',
    location: 'superville',
    email: 'super@supertest.com',
    password: 'supertest',
  });
  console.log('user', user);

  await supertest(testApp)
    .post('/api/users/login')
    .send(user)
    .expect(200)
    .then(async (response) => {
      // Check the response
      console.log('inside post and response looks like:', response);
      //expect(response.body._id).toBeTruthy();
      // expect(response.body).toBe(user);
      // expect(response.body.firstName).toBe(user.firstName);
      // Check the data in the database
      // const loggedUser = await User.findOne({
      // email: response.body.user.email,
      // });
      // console.log('loggedUser', loggedUser);
      // expect(loggedUser).toBeTruthy();
      // expect(loggedUser.firstName).toBe(user.firstName);
    });
});
