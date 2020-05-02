const { getAllUserEvent, getUserById } = require('./../../database/query/user');
const { InternalErrorMessage, UnauthorizedMessage, successMessage } = require('./../../helpers/responseMessage');

module.exports = async (req, res) => {
  const userId = '2b8a3b7a-1d77-4660-87ce-3155b3e7cadf'; //req.user;
  console.log('start profile');
  try {
    let userEvents = null;
    const userInfo = (await getUserById(userId)).rows[0];
    if (userInfo !== 'admin') {
      userEvents = (await getAllUserEvent(userId)).rows;
    }
    /*
      if userinfo not found ,
      the user must be login again to continue  
    */
    if (!userInfo) {
      return res
        .status(200)
        .clearCookie('AuthToken')
        .json(UnauthorizedMessage(null, 'please login to continue... '));
    }

    return res.status(200).json(successMessage({ userInfo, userEvents }, 'user profile'));
  } catch (err) {
    console.log('Error in Get Profile : ', err);
    return res.status(200).json(InternalErrorMessage(null, 'internal error in the server'));
  }
};
