const connection = require('../../connection');

module.exports = (id) => {
  const sql = {
    text: 'delete FROM userEvent where id = $1;',
    values: [id],
  };
  console.log('deleteUserEventbyId : ', sql);
  return connection.query(sql.text, sql.values);
};
