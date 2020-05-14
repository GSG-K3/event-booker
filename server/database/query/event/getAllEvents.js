const connection = require('../../connection');

module.exports = () => {
  const sql = {
    text: 'select * from events order by event_date DESC , event_time ASC;',
  };
  return connection.query(sql.text, sql.value);
};
