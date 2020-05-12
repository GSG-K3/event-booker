const connection = require('./../../connection');

module.exports = (userId) => {
  const sql = {
    text: `SELECT events.title , events.event_date , events.event_time ,events.event_status ,
                  events.gid , userEvent.code , userEvent.attendance_status ,userEvent.note 
           FROM 
           users inner join userEvent on 
           users.id = userEvent.user_id 
           inner join events on 
           userEvent.event_id = events.id
           where users.gid = $1;`,
    value: [userId],
  };
  return connection.query(sql.text, sql.value);
};
