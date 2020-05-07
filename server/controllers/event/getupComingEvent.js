const DbgetupComingEvent = require('../../database/query/event/getupComingEvent');

const DbgetAllcategory = require('../../database/query/category/getAllcategory');

const responseMessage = require('../../helpers/responseMessage');

module.exports = async (req, res) => {
  let upComingEvent = [];
  let category = [];
  try {
    category = (await DbgetAllcategory()).rows;
    upComingEvent = (await DbgetupComingEvent()).rows;
  } catch (err) {
    return res
      .status(501)
      .json(
        responseMessage.InternalErrorMessage(
          null,
          'internal error with the server',
        ),
      );
  }
  const data = GetEventsOfCategory(category, upComingEvent);
  res.cookie('AuthToken', 'auth');
  return res
    .status(200)
    .json(
      responseMessage.successMessage(
        data,
        'the Data Contains Events of each Category enjoy',
      ),
    );
};

const GetEventsOfCategory = (category, upComingEvent) => {
  if (!category || !upComingEvent) return null;

  return category.map((item) => {
    // get event of Category
    const event = upComingEvent.filter((cevent) => {
      return cevent.category_id === item.id;
    });
    // return Events of each Category
    return { ...item, events: event };
  });
};
