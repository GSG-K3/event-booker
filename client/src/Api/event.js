import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:4000/';
const getEventById = (id) => {
  console.log(id);
  axios.get(`/api/event/${id}`).then((res) => {
    const eventdetail = res.data;
    console.log(eventdetail);
    return eventdetail;
  });
};
export { getEventById };
