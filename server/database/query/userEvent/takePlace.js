const connection = require('../../connection');

const { v4: uuidv4 } = require('uuid');

module.exports = (eventId, userId, userCode) => {
  const sql = {
    text:
      'INSERT INTO userEvent (gid, event_id,user_id,code ) values($1,$2,$3,$4)',
    value: [uuidv4(), eventId, userId, userCode],
  };
  return connection.query(sql.text, sql.value);
};
