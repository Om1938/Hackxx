let db = require('../../conffig/db');
const Roles = require('../../_helper/UserRoles');

module.exports.addStudent = async student => {
  const dbo = await db;
  console.log(student);
  const result = await dbo.collection('student').insertOne(student);
  if (result.insertedCount === 1) return result.ops[0];
  else throwError('Some Error Occured');
};

const throwError = (message, status) => {
  const error = new Error(message);
  error.status = status | 400;
  return error;
};
