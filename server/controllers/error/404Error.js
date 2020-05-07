const { NotFoundMessage } = require('../../helpers/responseMessage');

module.exports = (req, res) => {
  return res
    .status(404)
    .json(NotFoundMessage(null, 'Sorry , the page not Found'));
};
