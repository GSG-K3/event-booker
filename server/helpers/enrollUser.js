const randomize = require('randomatic');

const {
  getEventById,
  updateEventMemberCount,
} = require('../database/query/event');

const { takePlace } = require('../database/query/userEvent');

module.exports = async (eventGID, userID) => {
  try {
    if (!eventGID || !userID) return null;
    const event = (await getEventById(eventGID)).rows[0];
    if (!event) return null;
    const count = event.member_cnt + 1;
    await updateEventMemberCount(eventGID, count, false);
    const code = randomize('00000000', 6);
    return takePlace(event.id, userID, code);
  } catch (err) {
    console.log(err);
    return null;
  }
};
