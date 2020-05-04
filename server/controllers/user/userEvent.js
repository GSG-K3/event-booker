const responseMessage = require('../../helpers/responseMessage');
const {
  getUserById,
  getAllUserEvent,
  getUserEventById,
} = require('../../database/query/user');

/*
get event of current user 
we can specify event or get all events
by passing eventId in request ,  
if eventId === 'all' then get all user Event
otherwise get user Event by id
this method using in event Details to diplay the user code of this evnte 
and user in user profile / events Tab
*/
module.exports = async (req, res) => {
  console.log('user Event req : ', req.params);

  console.log('start user Event');
  // get eventId from req.body
  // if eventId === 'all' then get all user Event
  //otherwise get user Event by id
  let userEvent = null;
  const eventId = req.params.eventId;
  const userId = '2b8a3b7a-1d77-4660-87ce-3155b3e7cadf'; //req.user;

  //let
  //let user = null;

  // get user Event depend eventId
  // if eventId === 'all' then get all user Event
  // otherwise get user Event by id
  try {
    userEvent =
      eventId === 'all'
        ? (await getAllUserEvent(userId)).rows
        : (await getUserEventById(eventId, userId)).rows[0];
  } catch (err) {
    console.log('Error in Get user Event : ', err);
    return res
      .status(200)
      .json(
        responseMessage.InternalErrorMessage(
          null,
          'internal error with the server'
        )
      );
  }

  console.log('userEvent : ', userEvent);

  // console.log(
  //   ' Data  send to user :',
  //   eventId === 'all' ? userEvent : userEvent.code
  // );

  return res
    .status(200)
    .json(responseMessage.successMessage(userEvent, 'user Event'));
};
