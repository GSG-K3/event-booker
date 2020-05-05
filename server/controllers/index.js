const router = require('express').Router();

const {
  getEventById,
  getupComingEvent,
  takePlace,
  cancelPlace,
  postEvent,
} = require('./event/');
const getcategory = require('./category/getcategory');
const getUserByName = require('./user/getUserByName');
const userEvent = require('./user/userEvent');
const profile = require('./user/profile');
const isAuth = require('../middleware/isAuth');
const addUser = require('./user/signup');

// get event Details => pageName : EventDetails
router.get('/api/event/:id', getEventById);
router.get('/api/envet/getupComingEvent', getupComingEvent);
router.post('/api/user/signup', addUser);
// get user Code of event => pageName : EventDetails , Login restricted
router.get('/api/user/userCode/:eventId', userEvent); //isAuth;

// enroll in event  => pageName : EventDetails , Login restricted
router.post('/api/event/takePlace', takePlace); //isAuth;

// cancel Registration  in event  => pageName : EventDetails , Login restricted
router.delete('/api/event/cancelPlace', cancelPlace); //isAuth;

router.get('/api/user/profile', profile);
router.post('/user/login', getUserByName);

router.get('/api/admin/getcategory', getcategory);
router.post('/api/admin/event/addEvent', postEvent);
module.exports = router;
