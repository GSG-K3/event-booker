const connection = require('../../connection');

/*
get member info for how Enroll in the Event
*/
module.exports = (eventId) => {
  const sql = {
    text: `SELECT userEvent.code ,users.gid ,users.user_name ,users.phone,users.birth_date,users.email,
                  users.university,users.address,users.profession , age(users.birth_date)
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
