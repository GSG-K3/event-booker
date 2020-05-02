const router = require('express').Router();

const { getEventById, getupComingEvent, takePlace, cancelPlace } = require('./event/');

const userEvent = require('./user/userEvent');

const profile = require('./user/profile');

const isAuth = require('./../middleware/isAuth');

// get event Details => pageName : EventDetails
router.get('/api/event/:id', getEventById);

// get upcoming event  => pageName : Home
router.get('/api/envet/getupComingEvent', getupComingEvent);

// get user Code of event => pageName : EventDetails , Login restricted
router.get('/api/user/userCode/:eventId', userEvent); //isAuth;

// enroll in event  => pageName : EventDetails , Login restricted
router.post('/api/event/takePlace', takePlace); //isAuth;

// cancel Registration  in event  => pageName : EventDetails , Login restricted
router.delete('/api/event/cancelPlace', cancelPlace); //isAuth;

router.get('/api/user/profile', profile);

module.exports = router;
