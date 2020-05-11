const getEventById = require('./getEventById');
// hello from the other side
const getupComingEvent = require('./getupComingEvent');
const takePlace = require('./takePlace');
const getEventsDay = require('./getEventsDay');

const getEventMemberById = require('./getEventMemberById');
const getEventMemberInfoById = require('./getEventMemberInfoById');

const updateEventMemberCount = require('./updateEventMemberCount');

module.exports = {
  getEventById,
  getupComingEvent,
  takePlace,
  getEventsDay,
  getEventMemberById,
  getEventMemberInfoById,
  updateEventMemberCount,
};
