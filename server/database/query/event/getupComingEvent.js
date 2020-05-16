const connection = require('../../connection');

module.exports = () => {
  const sql = {
    text:
      'select gid , title ,category_id ,description , event_date ,event_time ,host ,event_location from events where event_date > $1  order by event_date DESC , event_time ASC;',
    value: [new Date().toLocaleDateString()],
  };
  return connection.query(sql.text, sql.value);
};
