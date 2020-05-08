const router = require('express').Router();

const {
  getEventById,
  getupComingEvent,
  takePlace,
  cancelPlace,
} = require('./event');

const { login, profile, signup, userEvent } = require('./user');

const { postEvent } = require('./admin');

const getcategory = require('./category/getcategory');

const isAuth = require('../middleware/isAuth');

const checkPermissions = require('../middleware/checkPermissions');

const ROLE = require('../helpers/Constants');
// login user , Create Auth Token Cookies
router.post('/user/login', login);

// post new User
router.post('/api/user/signup', signup);

// get event Details => pageName : EventDetails
router.get('/api/event/:id', getEventById);

// get up Coming Event to Display in Home Page
router.get('/api/envet/getupComingEvent', getupComingEvent);

// get user Code of event => pageName : EventDetails , Login restricted
router.get('/api/user/userCode/:eventId', isAuth, userEvent);

// enroll in event  => pageName : EventDetails , Login restricted
router.post('/api/event/takePlace', isAuth, takePlace);

// cancel Registration  in event  => pageName : EventDetails , Login restricted
router.delete('/api/event/cancelPlace', isAuth, cancelPlace);

//================================================================
//============== Admin Endpoint ==================================
// open user Profile , contains userInfo , Event of user
router.get('/api/user/profile', isAuth, profile);

router.get('/api/admin/event/:id', isAuth, getEventById);

router.get('/api/admin/getcategory', isAuth, getcategory);

router.post('/api/admin/event/addEvent', isAuth, postEvent);

router.get('/api/admin/getcategory', isAuth, getcategory);
router.post('/api/admin/event/addEvent', isAuth, postEvent);

// quick test of permissions
// rest of code in admin home back end branch
// is not mearged yet
router.get(
  '/api/admin/getEventsDay',
  isAuth,
  checkPermissions(ROLE.USER),
  (req, res) => {
    res.json('Hi getEventsDay');
  },
);

module.exports = router;
