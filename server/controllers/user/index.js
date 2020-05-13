const login = require('./login');
const profile = require('./profile');
const signup = require('./signup');
const userEvent = require('./userEvent');

const checkUserEmail = require('./checkUserEmail');

const logout = require('./logout');

module.exports = { login, profile, signup, userEvent, checkUserEmail };
