const router = require('express').Router();

const getEventById = require('./event/getEventById');
const getUserByName = require('./user/getUserByName');

router.get('/api/event/:id', getEventById);

router.post('/user/login', getUserByName);

module.exports = router;
