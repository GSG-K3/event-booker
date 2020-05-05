const { InternalErrorMessage } = require('../../helpers/responseMessage');

module.exports = (err, req, res, next) => {
  return res
    .status(501)
    .json(InternalErrorMessage(null, 'Sorry , the page not Found'));
};
