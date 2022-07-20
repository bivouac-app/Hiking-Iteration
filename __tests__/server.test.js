const mongoose = require('mongoose');
const express = require('express');
const supertest = require('supertest');
const userRoute = require('../server/routes/userRoute');
const hikeRoute = require('../server/routes/hikeRoute');
const { MongoClient } = require('mongodb');
const client = new MongoClient(global.__MONGO_URI__);
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');
const User = require('../server/models/usersModel');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

// //helper function for supertesting purposes:

function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/api/users', userRoute);
  app.use('/api/hikes', hikeRoute);
  return app;
}
console.log(createServer);

const testApp = createServer();

test('GET /api/users', async () => {
  const user = await User.create({
    firstName: 'supertestFirst',
    lastName: 'supertestLast',
    location: 'superville',
    email: 'super@supertest.com',
    password: 'supertest',
  });

  await supertest(testApp)
    .get('/api/users/getall')
    .expect(200)
    .then((response) => {
      //check response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      //check response data
      expect(response.body[0]._id).toBe(user.id);
      expect(response.body[0].firstName).toBe(user.firstName);
      expect(response.body[0].lastName).toBe(user.lastName);
      expect(response.body[0].location).toBe(user.location);
      expect(response.body[0].email).toBe(user.email);
      expect(response.body[0].password).toBe(user.password);
    });
});
