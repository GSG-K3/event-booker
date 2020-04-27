const router = require('express').Router();
console.log('start router');

const getEventById = require('./event/getEventById');
console.log(getEventById);
router.get('/api/event/:id', getEventById);
// router.get('/api/event/:id', getEventById);

//const getevent = require('./../database/query/event/getEventById');
// router.get('/t', (req, res) => {
//   console.log('stat request');
//   getevent(1)
//     .then((data) => {
//       console.log('then data');
//       console.log({ data23: data.rows });

//       res.json(data.rows);
//     })
//     .catch((err) => console.log(err));
// });

module.exports = router;
