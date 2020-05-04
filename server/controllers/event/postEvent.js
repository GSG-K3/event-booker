const PostEventBydata = require('../../database/query/event/postEvent');
const responsemessage = require('../../helpers/responseMessage');

const PostEvent = (req, res) => {
  const Evndata = req.body;

  PostEventBydata(Evndata)
    .then((data) => {
      res
        .status(200)
        .json(responsemessage.successMessage(null, 'event added succesfuly'));
    })
    .catch((err) => {
      res
        .status(501)
        .json(
          responsemessage.InternalErrorMessage(
            null,
            'internal error with the server',
          ),
        );
    });
};
module.exports = PostEvent;
