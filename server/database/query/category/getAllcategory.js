const connection = require('../../connection');

module.exports = () => {
  const sql = {
    text: 'select * from category ',
  };

  return connection.query(sql.text);
};
