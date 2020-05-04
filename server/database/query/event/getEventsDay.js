const connection = require('../../connection');

module.exports = () => {
  const sql = {
    text:
      'select gid , title ,category_id ,description , event_date ,event_time ,host ,event_location from events where event_date === now()',
    value: [],
  };
  return connection.query(sql.text);
};
