const router = require('express').Router();

const getEventById = require('./event/getEventById');

const addUser = require('./user/signup')

router.get('/api/event/:id', getEventById);
router.post('/api/user/signup', addUser);

module.exports = router;
