const connection = require('../../connection');

module.exports = () => {
  const sql = {
    text: 'select * from events',
  };
  return connection.query(sql.text, sql.value);
};
