const randomize = require('randomatic');
const responseMessage = require('./../../helpers/responseMessage');
const dbGetEventById = require('./../../database/query/event/getEventById');
const dbGetUserById = require('./../../database/query/user/getUserById');
const dbTakePlace = require('./../../database/query/event/takePlace');
module.exports = async (req, res) => {
  console.log(req.body);

  const eventId = req.body.eventId;
  const userId = 'f294397d-eaa7-42b8-87cc-99b2d2d98d29'; //req.user;

  console.log('evetId ', eventId);
  console.log('userid ', userId);

  let event = null;
  let user = null;

  try {
    event = (await dbGetEventById(eventId)).rows[0];
    user = (await dbGetUserById(userId)).rows[0];
  } catch (err) {
    console.log('Error in Take Blace get user and Event : ', err);
    return res
      .status(200)
      .json(
        responseMessage.InternalErrorMessage(
          null,
          'internal error with the server'
        )
      );
  }

  console.log('evetn object from db', event);
  console.log('user object from db', user);

  if (!event || !user) {
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

  const code = randomize('0aA', 6);
  console.log('code : ', code);
  dbTakePlace(event.id, user.id, code)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(200)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Enroll in Event , please try again'
            )
          );
      }
      return res
        .status(200)
        .json(
          responseMessage.successMessage(
            { userCode: code },
            'you are sussfully Enroll in Event Enjoy'
          )
        );
    })
    .catch((err) => {
      console.log('Error in Take Blace insert user Event : ', err);
      return res
        .status(501)
        .json(
          responseMessage.InternalErrorMessage(
            null,
            'internal error with the server'
          )
        );
    });
};
