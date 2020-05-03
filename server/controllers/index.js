const router = require('express').Router();

const getEventById = require('./event/getEventById');
const getUserByName = require('./user/getUserByName');
// const { getEventById, getupComingEvent } = require('./event/');
const { getupComingEvent } = require('./event/');
router.get('/api/event/:id', getEventById);
router.get('/api/envet/getupComingEvent', getupComingEvent);

router.post('/user/login', getUserByName);

module.exports = router;
