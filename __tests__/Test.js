const {MongoClient} = require('mongodb');
const client = new MongoClient(global.__MONGO_URI__)
const User = require('../server/models/usersModel');

const fakeUser = {
  firstName : 'Test',
  lastName : 'Dummy', 
  location : 'New York',
  email : 'abc@gmail.com',
  password : 'abc123',
};

describe('Test testing', () => {
  let db;

  beforeAll(async () => {
    await client.connect();
    db = await client.db();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should insert a doc into collection', async () => {
    console.log(db);
    const users = db.collection('users');
  
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);
  
    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});