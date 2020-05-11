const { addUser } = require('../../database/query/user');

const {
  InternalErrorMessage,
  FailedMessage,
  successMessage,
} = require('../../helpers/responseMessage');

const { registrationValidation } = require('../../helpers/Validation');

const signup = (req, res) => {
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

  addUser(data, (err, result) => {
    if (err) {
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'internal error with the server'));
    }
    return res
      .status(200)
      .json(successMessage(null, ' You are registered successfully'));
  });
};
module.exports = signup;
