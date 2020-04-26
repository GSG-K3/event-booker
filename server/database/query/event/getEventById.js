const connection = require('../../connection');

const getEventById = (id) => {
  const sql = {
    text: 'SELECT * FROM events where gid = $1;',
    values: [id],
  };
  return connection.query(sql.text, sql.values);
};

module.exports = getEventById;
