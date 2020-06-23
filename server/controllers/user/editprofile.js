const { editUserInfo } = require('../../database/query/user');

// require('dotenv').config();

// const jwt = require('jsonwebtoken');

const {
  InternalErrorMessage,
  FailedMessage,
  successMessage,
} = require('../../helpers/responseMessage');

const { registrationValidation } = require('../../helpers/Validation');

const editprofile = (req, res) => {
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

  const { error } = registrationValidation(data);

  if (error) {
    // return error message if not valid

    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res.status(400).json(FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  editUserInfo(data)
    .then((result) => {
      if (err) {
        return res
          .status(501)
          .json(InternalErrorMessage(null, 'internal error with the server'));
      }

      const auth = jwt.sign({ id: gid }, process.env.acces_Token_secret);
      res.cookie('AuthToken', auth);
      return res
        .status(200)
        .json(successMessage(null, ' You are registered successfully'));
    })
    .catch((err) => {
      res.status(501).json(InternalErrorMessage(null, 'internal error'));
    });
};
module.exports = editprofile;
