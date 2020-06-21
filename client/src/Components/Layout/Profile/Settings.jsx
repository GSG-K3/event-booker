import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ChangePassword from './SettingComponent/ChangePassword';
export default ({ userInfo, setIsLoading }) => {
  console.log(userInfo);
  return (
    <Grid container>
      {/* <h1>{{ ...userInfo }}</h1> */}
      {/* <h1>sdfsd</h1> */}
      <ChangePassword userInfo={userInfo} setIsLoading={setIsLoading} />
    </Grid>
  );
};
