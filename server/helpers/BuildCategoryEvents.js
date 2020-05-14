module.exports = (category, upComingEvent) => {
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
