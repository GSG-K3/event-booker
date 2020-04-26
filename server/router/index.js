const router = require('express').Router();
console.log('start router');
const getEventById = require('../controllers/event/getEventById');
console.log(getEventById);
router.get('/api/event/:id', getEventById);

module.exports = router;
