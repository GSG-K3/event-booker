const router = require('express').Router();

const getEventById = require('./event/getEventById');

router.get('/api/event/:id', getEventById);

module.exports = router;
