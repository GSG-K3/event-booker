require('dotenv').config();

const responseMessage = require('./../helpers/responseMessage');

const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = !req.cookies ? null : req.cookies.AuthToken;
  if (!token) {
    return res
      .status(200)
      .json(
        responseMessage.UnauthorizedMessage(
          null,
          'please login to continue... '
        )
      );
  }

  verify(token, process.env.acces_Token_secret, (err, payload) => {
    if (err) {
      return res
        .status(200)
        .clearCookie('AuthToken')
        .json(
          responseMessage.UnauthorizedMessage(
            null,
            'please login to continue... '
          )
        );
    }

    req.user = payload;
    return next();
  });
};
