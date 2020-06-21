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
    if (err) {
      console.log('err add user ', err);
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'internal error with the server'));
    }

    getUserById(gid)
      .then(async (userres) => {
        const user = userres.rows[0];
        if (!data.eventID) {
          return res
            .status(200)
            .json(successMessage(null, 'The Member just  Added Successfully '));
        }

        const takePlace = await enroll(data.eventID, user);

        if (takePlace === null) {
          return res
            .status(400)
            .json(
              FailedMessage('', 'Some Error Happened at user Enroll Event'),
            );
        }

        return res
          .status(200)
          .json(
            successMessage(
              null,
              'The Member Added Successfully and Enroll in Event , the Code was sent to member Email',
            ),
          );
      })
      .catch((err) => {
        console.log('Error in get user by id ', { ...err });
        return res
          .status(500)
          .json(InternalErrorMessage(null, 'Error In Add Member '));
      });
  });
};

module.exports = newMember;
