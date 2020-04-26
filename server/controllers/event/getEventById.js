const getevent = require('../../database/query/event/getEventById');
const responsemessage = require('../../helpers/responseMessage');

const getEventbyId = (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log('start geteventdetails');
  console.log(id);
  getevent(id)
    .then((data) => {
      res
        .status(200)
        .json(responsemessage.successMessage(data, 'event details'));
    })
    .catch((err) => {
      res
        .status(501)
        .json(
          responsemessage.InternalErrorMessage(
            null,
            'internal error with the server'
          )
        );
    });
};
module.exports = getEventbyId;
