const getEventById = require('./getEventById');
// hello from the other side
const getupComingEvent = require('./getupComingEvent');

const getEventsDay = require('./getEventsDay');

const getEventMemberById = require('./getEventMemberById');
const getEventMemberInfoById = require('./getEventMemberInfoById');
const checkUserCode = require('./checkUserCode');

const updateEventMemberCount = require('./updateEventMemberCount');
const getAllEvents = require('./getAllEvents');

module.exports = {
  getEventById,
  getupComingEvent,
  getEventsDay,
  getEventMemberById,
  getEventMemberInfoById,
  updateEventMemberCount,
  checkUserCode,
  getAllEvents,
};
