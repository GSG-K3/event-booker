const responseMessage = require('./../../helpers/responseMessage');
const {
  getUserEventById,
  deleteUserEventbyId,
} = require('./../../database/query/user');

module.exports = async (req, res) => {
  const eventId = req.body.eventId;
  const userId = '2b8a3b7a-1d77-4660-87ce-3155b3e7cadf'; //req.user;

  getUserEventById(eventId, userId)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(200)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Cancel Registration , please try again'
            )
          );
      }

      return result.rows[0].id;
    })
    .then((id) => {
      return deleteUserEventbyId(id);
    })
    .then((deleteResult) => {
      if (deleteResult.rowCount === 0) {
        return res
          .status(200)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Cancel Registration , please try again'
            )
          );
      }

      return res
        .status(200)
        .json(
          responseMessage.successMessage(
            null,
            'your Registration successfully cancelled'
          )
        );
    })
    .catch((err) => {
      console.log('Error in Cancle place Deelte user Event : ', err);
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
