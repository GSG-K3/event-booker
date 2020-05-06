const {
  getEventMemberById,
  getEventMemberInfoById,
  getEventById,
} = require('../../database/query/event');

const {
  InternalErrorMessage,
  successMessage,
} = require('../../helpers/responseMessage');

module.exports = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const eventMember = (await getEventMemberById(id)).rows;
    const eventMemberInfo = (await getEventMemberInfoById(id)).rows;
    const eventInfo = (await getEventById(id)).rows;
    console.log('eventMember', eventMember);
    console.log('eventMemberInfo', eventMemberInfo);
    return res
      .status(200)
      .json(
        successMessage(
          { eventInfo, eventMember, eventMemberInfo },
          'Event Member  with  their information',
        ),
      );
  } catch (err) {
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error with the server'));
  }
};
