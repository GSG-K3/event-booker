const router = require('express').Router();

const { getEventById, getupComingEvent } = require('./event/');

router.get('/api/event/:id', getEventById);
router.get('/api/envet/getupComingEvent', getupComingEvent);

module.exports = router;
