// const server = require('../server/server');
// const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');
const User = require('../server/models/usersModel');
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require('./utils/validators.utils');

const fakeUser = {
  firstName : 'Test',
  lastName : 'Dummy', 
  location : 'New York',
  email : 'abc@gmail.com',
  password : 'abc123',
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite',  () => {
  test('Should add a user to the database', async () => {
    const validUser =  new User(fakeUser);
    const savedUser = await validUser.save();

    console.log('savedUser',savedUser);
    console.log('validUser', validUser)
    expect(savedUser.firstName).toNotBeNull();
  });

  test('should validate MongoError duplicate error with code 11000', async () => {
    expect.assertions(4);
    const validStudentUser = new User({
      local: fakeUserData,
      role: fakeUserData.role,
    });
    try {
      await validStudentUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });
})


