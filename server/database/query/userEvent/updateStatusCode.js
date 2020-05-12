const connection = require('../../connection');

module.exports = (id, status) => {
  const sql = {
    text: 'UPDATE userEvent   SET   attendance_status = $1 where id = $2',
    value: [status, id],
  };
  return connection.query(sql.text, sql.value);
};
