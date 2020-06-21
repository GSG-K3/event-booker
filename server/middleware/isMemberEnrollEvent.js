const {
  FailedMessage,
  InternalErrorMessage,
} = require('../helpers/responseMessage');

const { checkUserEvent } = require('../database/query/userEvent');

module.exports = (req, res, next) => {
  const { eventId, memberId } = req.body.data;
  checkUserEvent(eventId, memberId)
    .then((result) => {
      if (result.rows[0].count > 0) {
        return res
          .status(400)
          .json(
            FailedMessage(false, 'The User already Enrolled in this Event '),
          );
      }
      next();
    })
    .catch((err) => {
      console.log({ ...err });
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'Error In Check user in Event'));
    });
};
