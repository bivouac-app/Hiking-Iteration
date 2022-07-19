// const server = require('../server/server');
// const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');
const User = require('../server/models/usersModel');
const { dbConnect, dbDisconnect } = require('./utils/dbHandler.utils.js');

const fakeUser = {
  firstName : { type : String, required : true } ,
  lastName : , 
  location : 'New York',
  email : 'abc@gmail.com',
  password : 'abc123',
};