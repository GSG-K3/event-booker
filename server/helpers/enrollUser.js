const randomize = require('randomatic');

const {
  getEventById,
  updateEventMemberCount,
} = require('../database/query/event');

const { takePlace } = require('../database/query/userEvent');

const sendEmail = require('../helpers/sendEmail');

module.exports = async (eventGID, user) => {
  try {
    if (!eventGID || !user) return null;
    const event = (await getEventById(eventGID)).rows[0];
    if (!event) return null;
    const count = event.member_cnt + 1;
    await updateEventMemberCount(eventGID, count, false);
    const code = randomize('00000000', 6);
    const place = await takePlace(event.id, user.id, code);

    if (place.rowCount === 0) {
      return null;
    }
    const eventinfo = {
      to: user.email,
      subject: ` The ${event.title} Event registration code `,
      html: `<h2> The code for ${event.title} Event is ${code} </h2>`,
    };
    await sendEmail(eventinfo);

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
};
