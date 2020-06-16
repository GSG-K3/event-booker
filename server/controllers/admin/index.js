const getEventsDay = require('./event/getEventsDay');
const postEvent = require('./event/postEvent');
const takeMemberCode = require('./event/takeMemberCode');
const getEventMembers = require('./event/getEventMembers');
const getNewMember = require('./user/newMember');

const getAdminEvents = require('./event/getAdminEvents');
const getAdminEventDetail = require('./event/getAdminEventDetail');

module.exports = {
  getNewMember,
  getEventsDay,
  postEvent,
  takeMemberCode,
  getEventMembers,
  getAdminEvents,
  getAdminEventDetail,
};
