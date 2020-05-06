const getcategory = require('../../database/query/category/getAllcategory');
const responsemessage = require('../../helpers/responseMessage');

const getCategory = (req, res) => {
  getcategory()
    .then((data) => {
      res
        .status(200)
        .json(
          responsemessage.successMessage(
            data.rows,
            'category added succesfuly',
          ),
        );
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
module.exports = getCategory;
