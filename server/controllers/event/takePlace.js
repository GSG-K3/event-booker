const randomize = require('randomatic');
const responseMessage = require('./../../helpers/responseMessage');
const dbGetEventById = require('./../../database/query/event/getEventById');
const dbTakePlace = require('./../../database/query/event/takePlace');
const { getUserById } = require('./../../database/query/user');

module.exports = async (req, res) => {
  const eventId = req.body.eventId;

  console.log(req.user);

  const user = req.user;

  let event = null;

  try {
    event = (await dbGetEventById(eventId)).rows[0];
  } catch (err) {
    console.log('Error in Take Blace get user and Event : ', err);
    return res
      .status(501)
      .json(
        responseMessage.InternalErrorMessage(
          null,
          'internal error with the server',
        ),
      );
  }
  if (!event || !user) {
    return res
      .status(401)
      .clearCookie('AuthToken')
      .json(
        responseMessage.UnauthorizedMessage(
          null,
          'please login to continue... ',
        ),
      );
  }

  const code = randomize('0aA', 6);
  dbTakePlace(event.id, user.id, code)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(200)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Enroll in Event , please try again',
            ),
          );
      }
      return res
        .status(200)
        .json(
          responseMessage.successMessage(
            { userCode: code },
            'you are successfully Enroll in Event Enjoy',
          ),
        );
    })
    .catch((err) => {
      console.log('Error in Take Blace insert user Event : ', err);
      return res
        .status(501)
        .json(
          responseMessage.InternalErrorMessage(
            null,
            'internal error with the server',
          ),
        );
    });
};
