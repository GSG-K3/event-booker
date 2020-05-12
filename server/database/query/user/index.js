const getUserEventById = require('./getUserEventbyId');
const getAllUserEvent = require('./getAllUserEvent');
const getUserById = require('./getUserById');
const deleteUserEventbyId = require('./deleteUserEventbyId');
const addUser = require('./addUser');
const getUserByEmail = require('./getUserByEmail');

module.exports = {
  getUserById,
  getAllUserEvent,
  getUserEventById,
  deleteUserEventbyId,
  addUser,
  getUserByEmail,
};
