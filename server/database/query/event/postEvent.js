const connection = require('../../connection');

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
  const sql = {
    text:
      'INSERT INTO events  (gid, title, category_id , description, event_date, event_time, event_location, host) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)',
    values: [
      uuidv4(),
      title,
      category_id,
      description,
      event_date,
      event_time,
      event_location,

      host,
    ],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = PostEventBydata;
