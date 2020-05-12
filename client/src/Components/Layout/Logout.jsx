import React, { useEffect } from 'react';
import axios from 'axios';
import LoaderProgress from '../Common/LoaderProgress';
export default () => {
  useEffect(() => {
    console.log('run logout');
    axios
      .post('/user/logout')
      .then((result) => {
        window.location.replace('/');
      })
      .catch((err) => {
        console.log({ ...err });
        alert(err.response.data.messag);
      });
  }, []);

  return <LoaderProgress isLoading={true} />;
};
