// UPDATE Customers
// SET ContactName='Juan';

const connection = require('../../connection');
const { EVENTSTATUS } = require('../../../helpers/Constants');

const editUserInfo = (eventDetails) => {
  const {
    user_name,
    phone,
    email,
    birth_date,
    university,
    profession,
    address,
  } = eventDetails;

  const sql = {
    text:
      'UPDATE users  (user_name, phone, email, birth_date, university,  profession,  address,) SET ($1, $2, $3, $4,$5,$6,$7)',
    values: [
      user_name,
      phone,
      email,
      birth_date,
      university,
      profession,
      address,
    ],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = editUserInfo;
