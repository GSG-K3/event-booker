const connection = require('../../connection');

module.exports = (eventId, count) => {
  const sql = {
    text: 'UPDATE events SET  member_cnt = $1 where gid = $2',
    value: [count, eventId],
  };
  return connection.query(sql.text, sql.value);
};
