require('dotenv').config();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const logindb = require('../../database/query/login/login');
const responsemessage = require('../../helpers/responseMessage');

const { logInValidation } = require('../../helpers/Validation');

const login = (req, res) => {
  const userDate = req.body;
  const { error } = logInValidation(userDate);

  if (error !== undefined) {
    // return error message if not valid
    const errorMessage = error.toString().includes('^[a-zA-Z0-9]{3,30}$')
      ? 'the password must including Upper/lowercase and numbers characters'
      : error.toString().replace('ValidationError:', '');
    return res
      .status(200)
      .json(responsemessage.FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  logindb(userDate)
    .then((data) => {
      if (data.rowCount === 0) {
        return res
          .status(200)
          .json(
            responsemessage.FaildLoginMessage(
              null,
              'make sure of your email or password',
            ),
          );
      }
      bcrypt
        .compare(userDate.password, data.rows[0].password)
        .then((checkPss) => {
          if (!checkPss) {
            return res
              .status(200)
              .json(
                responsemessage.FaildLoginMessage(
                  null,
                  'make sure of your email or password',
                ),
              );
          }
          const auth = jwt.sign(
            { id: data.rows[0].gid },
            process.env.acces_Token_secret,
          );
          res.cookie('AuthToken', auth);
          res
            .status(200)
            .json(
              responsemessage.successMessage(
                auth,
                'welcome , you are login Successfully',
              ),
            );
        })
        .catch((err) => {
          res
            .status(501)
            .json(
              responsemessage.InternalErrorMessage(
                null,
                'internal error with the server',
              ),
            );
        });
    })

    .catch((err) => {
      res
        .status(501)
        .json(
          responsemessage.InternalErrorMessage(
            null,
            'internal error with the server',
          ),
        );
    });
};
module.exports = login;
