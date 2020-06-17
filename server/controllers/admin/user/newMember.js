const { addUser, getUserById } = require('../../../database/query/user');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const {
  InternalErrorMessage,
  FailedMessage,
  successMessage,
} = require('../../../helpers/responseMessage');

const enroll = require('../../../helpers/enrollUser');

const { newmemberValidation } = require('../../../helpers/Validation');

const newMember = (req, res) => {
  const data = !req.body ? null : req.body;

  if (!data) {
    return res
      .status(501)
      .json(
        InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  console.log(data);
  const { error } = newmemberValidation(data);

  if (error) {
    // return error message if not valid

    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res.status(400).json(FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  addUser(data, (err, gid) => {
    console.log('adduser');
    if (err) {
      console.log('err add user ', err);
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'internal error with the server'));
    }

    console.log('gid of new user ', gid);
    getUserById(gid)
      .then((userres) => {
        console.log('user by id', userres.rows);
        const usergid = userres.rows[0];

        console.log('start enroll');
        enroll(data.eventID, usergid.id)
          .then((responseEnroll) => {
            console.log('enroll res', responseEnroll);
            res.json(successMessage('', 'ok'));
          })
          .catch((err) => {
            console.log('err enroll ', err);
            res.status(501).json('Error');
          });
      })
      .catch((err) => {
        console.log('gt ueer id ', err);
        res.status(501).json('Error');
      });

    // const auth = jwt.sign({ id: gid }, process.env.acces_Token_secret);
    // res.cookie('AuthToken', auth);
    // return res
    //   .status(200)
    //   .json(successMessage(null, ' You are registered successfully'));
  });
};
module.exports = newMember;
