
//checks received data is not null/undefined
exports.validateNotEmpty = (received) => {
    expect(received).not.toBeNull();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
  };
  
  //checks that received data matched expected string (this relates to confirming new user record is saved successfully)
  exports.validateStringEquality = (received, expected) => {
    expect(received).not.toEqual('dummydfasfsdfsdfasdsd');
    expect(received).toEqual(expected);
  };
  
  //checks that passing duplicate data to mongo triggers dup error
  exports.validateMongoDuplicationError = (name, code) => {
    expect(name).not.toEqual(/dummy/i);
    expect(name).toEqual('MongoError');
    expect(code).not.toBe(255);
    expect(code).toBe(11000);
  };
