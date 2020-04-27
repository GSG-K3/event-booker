import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './../Home';
import EventDetails from './../EventDetails';
import Login from './../Login';
import Header from './../../Common/Header/Header';
import { Grid } from '@material-ui/core';
export default class UserLayout extends Component {
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
            <Grid item container xs={12} sm={6} justify="center">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/event/:id" component={EventDetails} />
                <Route exact path="/user/login" component={Login} />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}
