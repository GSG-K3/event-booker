const connection = require('../../connection');

module.exports = (id) => {
  const sql = {
    text: 'SELECT * FROM users where gid = $1;',
    values: [id],
  };
  console.log('sql get user by id', sql);
  return connection.query(sql.text, sql.values);
};
