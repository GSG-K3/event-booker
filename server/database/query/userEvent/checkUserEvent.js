const connection = require('../../connection');

/*
get userEvent   for how Enroll in the Event
*/
module.exports = (eventId, userId) => {
  const sql = {
    text: `SELECT count(*)
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           where events.gid = $1 AND users.gid = $2`,
    value: [eventId, userId],
  };
  return connection.query(sql.text, sql.value);
};
