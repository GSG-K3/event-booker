const { getAllUserByRole } = require('../../../database/query/user');
const {
  successMessage,
  InternalErrorMessage,
} = require('../../../helpers/responseMessage');
const { ROLE } = require('../../../helpers/Constants');

module.exports = (req, res) => {
  getAllUserByRole(ROLE.USER)
    .then((result) => {
      return res.json(successMessage(result.rows, 'All Member Data'));
    })
    .catch((err) => {
      console.log('Error in get All User : ', { ...err });
      return res.json(InternalErrorMessage(err, 'Error in get All Member'));
    });
};
