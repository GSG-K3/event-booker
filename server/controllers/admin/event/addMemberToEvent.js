const enrollEvent = require('../../../helpers/enrollUser');
const { getUserById } = require('../../../database/query/user');
const { getEventById } = require('../../../database/query/event');
const {
  successMessage,
  FailedMessage,
  InternalErrorMessage,
} = require('../../../helpers/responseMessage');

module.exports = async (req, res) => {
  const { eventId, memberId } = req.body.data;

  try {
    const user = (await getUserById(memberId)).rows[0];

    const takePlace = await enrollEvent(eventId, user);

    if (takePlace === null) {
      return res
        .status(400)
        .json(
          FailedMessage('', 'Sorry some Error happened at Enroll in Event'),
        );
    }

    return res
      .status(200)
      .json(
        successMessage(
          '',
          'The Member Added to Event , and the Event Code was sent to member email',
        ),
      );
  } catch (err) {
    console.log('error in add member to event ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'Error In Add Member to Event'));
  }
};
