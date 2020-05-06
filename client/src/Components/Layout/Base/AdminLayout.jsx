import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddNewEvent from './../AddNewEvent';

import Header from './../../Common/Header/Header';
import { Grid } from '@material-ui/core';

export default class AdminLayout extends Component {
  render() {
    return (
      <Router>
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
              <Switch>
                <h1>Hi , you are in Admin Palne</h1>
              </Switch>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}
