const router = require('express').Router();

const { getEventById, getupComingEvent } = require('./event/');

const addUser = require('./user/signup')

router.get('/api/event/:id', getEventById);
router.post('/api/user/signup', addUser);
router.get('/api/envet/getupComingEvent', getupComingEvent);

module.exports = router;
