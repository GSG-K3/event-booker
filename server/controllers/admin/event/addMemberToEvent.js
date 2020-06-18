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

  console.log('memberId : ', memberId);
  try {
    const user = (await getUserById(memberId)).rows[0];

    const takePlace = await enrollEvent(eventId, user);

    if (takePlace === null) {
      return res.status(400).json(FailedMessage('', 'Enroll Event'));
    }

    if (takePlace === true) {
      return res
        .status(400)
        .json(
          FailedMessage(null, 'Sorry some Error happened at Enroll in Event '),
        );
    }

    return res
      .status(200)
      .json(successMessage('', 'The Member Added to Event'));
  } catch (err) {
    console.log('error in add member to event ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'Error In Add Member to Event'));
  }
};
