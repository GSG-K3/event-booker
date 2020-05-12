const { checkUserCode } = require('../../../database/query/event');
const { updateStatusCode } = require('../../../database/query/userEvent');
const {
  getEventById,
  updateEventMemberCount,
} = require('../../../database/query/event');
const {
  InternalErrorMessage,
  successMessage,
  FailedMessage,
} = require('../../../helpers/responseMessage');

module.exports = (req, res) => {
  let userEventId = 0;
  let count = 0;
  const { eventId, userId, code } = req.body;
  checkUserCode(eventId, userId, code)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(400)
          .json(FailedMessage(null, 'the Code is not Valid'));
      }
      return result.rows[0].id;
    })
    .then((id) => {
      // id of user Event
      // update Status Code
      // to uesing if any error hapend we event update
      userEventId = id;
      // 1 means true
      return updateStatusCode(userEventId, 1);
    })
    .then((updateResult) => {
      // status code not updated
      if (updateResult.rowCount === 0) {
        return res
          .status(400)
          .json(FailedMessage(null, 'the Code is not Valid'));
      }

      // status code  updated and must
      // get event to update attendance cnt
      return getEventById(eventId);
    })
    .then(async (event) => {
      // event not found so we must reject the code
      if (event.rowCount === 0) {
        // set status code to false
        // 0 means false
        await updateStatusCode(userEventId, 0);
        return res.status(400).json(FailedMessage(null, 'Error at Get Event'));
      }
      // the event is found
      // update attendance cnt in event
      // set isAttendance = true to update  attendance_cnt column
      count = event.rows[0].attendance_cnt + 1;
      return updateEventMemberCount(eventId, count, true);
    })
    .then(async (updateEventMemberCounts) => {
      // updat Event Member Count  Error  so we must reject the code
      if (updateEventMemberCounts.rowCount === 0) {
        // set status code to false
        // 0 means false
        await updateStatusCode(userEventId, 0);
        return res
          .status(400)
          .json(FailedMessage(null, 'Error at update Event'));
      }
      res
        .status(200)
        .json(successMessage({ count, userId }, 'The Code is Valid'));
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'internal error with the server'));
    });
};
