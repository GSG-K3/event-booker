const router = require('express').Router();

const {
  getEventById,
  getupComingEvent,
  takePlace,
  cancelPlace,
} = require('./event/');

const getUserByName = require('./user/getUserByName');

const userEvent = require('./user/userEvent');

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
router.post('/user/login', getUserByName);

module.exports = router;
