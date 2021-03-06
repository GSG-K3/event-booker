const connection = require('../../connection');

/*
get userEvent   for how Enroll in the Event
*/
module.exports = (eventId) => {
  const sql = {
    text: `SELECT users.gid , users.user_name , userEvent.code , userEvent.attendance_status ,userEvent.note 
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           where events.gid = $1;`,
    value: [eventId],
  };

  return connection.query(sql.text, sql.value);
};
