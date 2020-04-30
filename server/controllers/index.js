const router = require('express').Router();

const { getEventById, getupComingEvent, takePlace } = require('./event/');

const isAuth = require('./../middleware/isAuth');

router.get('/api/event/:id', getEventById);
router.get('/api/envet/getupComingEvent', getupComingEvent);
router.post('/api/event/takePlace', takePlace); //isAuth;

module.exports = router;
