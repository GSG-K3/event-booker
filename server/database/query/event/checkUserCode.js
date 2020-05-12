const connection = require('../../connection');

/*
get userEvent   for how Enroll in the Event
*/
module.exports = (eventId, userId, code) => {
  const sql = {
    text: `SELECT  userEvent.id , users.user_name , userEvent.code 
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           where events.gid = $1 AND users.gid = $2 AND userEvent.code = $3;`,
    value: [eventId, userId, code],
  };

  return connection.query(sql.text, sql.value);
};
