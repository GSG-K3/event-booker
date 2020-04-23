import React, { Component } from 'react';
import Home from './../Home';
import Header from './../../Common/Header/Header';
import { Grid } from '@material-ui/core';
export default class UserLayout extends Component {
  render() {
    return (
      <Grid direction="column" container>
        <Grid item xs={12}>
          <Header
            showlogo={true}
            showMeun={true}
            showAvatar={false}
            isAvatarImage={false}
            srcImage={null}
            Name="User"
          />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={3} />
          <Grid item container xs={12} sm={6}>
            <Home />
          </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    );
  }
}
