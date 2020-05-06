const getEventById = require('./getEventById');
// hello from the other side
const getupComingEvent = require('./getupComingEvent');
const takePlace = require('./takePlace');
const cancelPlace = require('./cancelPlace');

const getEventMembers = require('./getEventMembers');
module.exports = {
  getEventById,
  getupComingEvent,
  takePlace,
  cancelPlace,
  getEventMembers,
};
