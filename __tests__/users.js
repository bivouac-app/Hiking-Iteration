// const server = require('../server/server');
// const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');
const User = require('../server/models/usersModel');
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');
const {
  validateNotEmpty,
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
  test('Should include all fields when adding new users', async () => {
    const validUser =  new User(fakeUser);
    const savedUser = await validUser.save();

    // console.log('savedUser',savedUser);
    // console.log('validUser', validUser)
    validateNotEmpty(savedUser.firstName);
    validateNotEmpty(savedUser.lastName);
    validateNotEmpty(savedUser.location);
    validateNotEmpty(savedUser.email);
    validateNotEmpty(savedUser.password);
  });

  test('Should not allow two users to have the same email', async () => {
    expect.assertions(1);
    const user1 = await (new User(fakeUser)).save();
    // console.log(user1);
    
    try {
      const user2 = await (new User(fakeUser)).save();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
})


