const connection = require('../../connection');

const getEventById = (id) => {
  const sql = {
    text:
      'SELECT gid,title,category_id,description,event_date,event_time,event_location,event_status,host,member_cnt ,attendance_cnt FROM events where gid = $1;',
    values: [id],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = getEventById;
