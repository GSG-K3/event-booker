const { UnauthorizedMessage } = require('../helpers/responseMessage');

module.exports = (role) => (req, res, next) => {
  const user = !req.user ? null : req.user;

  if (!user) {
    return res
      .status(200)
      .clearCookie('AuthToken')
      .json(UnauthorizedMessage(null, 'please login to continue... '));
  }

  if (user.role !== role) {
    return res.status(200).json(UnauthorizedMessage(null, 'Access Denied ...'));
  }

  // user Have permissions to access
  next();
};
