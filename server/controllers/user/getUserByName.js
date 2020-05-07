const logindb = require('../../database/query/login/login');
const responsemessage = require('../../helpers/responseMessage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getUserByName = (req, res) => {
  let reqbody = req.body;
  console.log(req.body);

  logindb(reqbody)
    .then((data) => {
      console.log(data);
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
        .compare(reqbody.password, data.rows[0].password)
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
            .json(responsemessage.successMessage(auth, 'welcome   '));
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
      res
        .status(200)
        .json(responsemessage.successMessage(req.body, 'you are logged in '));
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
module.exports = getUserByName;

//   if (
//     bcrypt.compareSync(req.body.user_password, response[0].user_password) ==
//     true
// ) {
//     res.cookie(req.body.user_name, response[0].user_password);
//     res.redirect('/event/:id');
// }
