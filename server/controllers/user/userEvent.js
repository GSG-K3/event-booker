const responseMessage = require('../../helpers/responseMessage');
const { getUserEventById } = require('../../database/query/user');

/*
get event of current user 
by passing eventId in request ,  
this method using in event Details to diplay the user code of this evnte 
*/
module.exports = async (req, res) => {
  // get eventId from req.body
  const { eventId } = req.params;
  const userId = req.user.gid;

  getUserEventById(eventId, userId)
    .then((result) => {
      return res
        .status(200)
        .json(
          responseMessage.successMessage(
            { userEvent: result.rows[0] },
            'user Event',
          ),
        );
    })
    .catch((err) => {
      console.log('Error in Get user Event : ', err);
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
