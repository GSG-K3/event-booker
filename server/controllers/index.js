const router = require('express').Router();
const getEventById = require('./event/getEventById');
const getUserByName = require('./user/getUserByName');
const { getupComingEvent, postEvent } = require('./event');
// const getcategory=require('./')
router.get('/api/event/:id', getEventById);
router.get('/api/envet/getupComingEvent', getupComingEvent);

router.post('/user/login', getUserByName);
router.post('/api/admin/event/addEvent', postEvent);
module.exports = router;
