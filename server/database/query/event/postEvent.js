const connection = require('../../connection');
const { EVENTSTATUS } = require('../../../helpers/Constants');
const { v4: uuidv4 } = require('uuid');
const PostEventBydata = (eventDetails) => {
  const {
    title,
    category_id,
    description,
    event_date,
    event_time,
    event_location,
    host,
  } = eventDetails;
  const time = new Date(event_time);
  const eventTime =
    time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  const sql = {
    text:
      'INSERT INTO events  (gid, title, category_id , description, event_date, event_time, event_location, host ,event_status , attendance_cnt ) VALUES ($1, $2, $3, $4,$5,$6,$7,$8 ,$9 , $10)',
    values: [
      uuidv4(),
      title,
      category_id,
      description,
      event_date,
      eventTime,
      event_location,
      host,
      EVENTSTATUS.OPEN,
      0,
    ],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = PostEventBydata;
