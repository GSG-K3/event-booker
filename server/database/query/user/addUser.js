const connection = require('../../connection');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const ROLE = require('../../../helpers/Constants');

const addUser = (userDetails, callback) => {
  const { name, phone, email, password, selectedDate } = userDetails;
  const role = !userDetails.role ? ROLE.USER : userDetails.role;

  bcrypt
    .hash(password, 10)
    .then((passwordHash) => {
      const sql = {
        text:
          'INSERT INTO USERS  (gid, user_name, phone, birth_date, email, university, address, role, profession, password) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)',
        values: [
          uuidv4(),
          name,
          phone,
          selectedDate,
          email,
          'unknown',
          'unknown',
          role,
          'unknown',
          passwordHash,
        ],
      };
      connection
        .query(sql.text, sql.values)
        .then((result) => {
          return callback(null, result);
        })
        .catch((error) => {
          return callback(error);
        });
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};
module.exports = addUser;