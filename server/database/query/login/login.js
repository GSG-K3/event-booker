const connection = require('../../connection');

const getuserlogin = (reqbody) => {
  const sql = {
    text:
      'SELECT email ,password,gid,user_name,role FROM users WHERE email =$1;',
    values: [reqbody.email],
  };
  console.log(sql);
  return connection.query(sql.text, sql.values);
};
module.exports = getuserlogin;
