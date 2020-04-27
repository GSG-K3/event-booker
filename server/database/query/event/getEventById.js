const connection = require('../../connection');

const getEventById = (id) => {
  console.log('statart query');
  const sql = {
    text: 'SELECT * FROM events where gid = $1;',
    values: [id],
  };
  console.log('Sql Qu : ', sql);
  return connection.query(sql.text, sql.values);
};
//'SELECT * FROM events where gid = $1;'
module.exports = getEventById;
