import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Home from '../Home';
import Header from '../../Common/Header/Header';
import SignUp from '../SignUp';
import EventDetails from '../EventDetails';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import TakeAttendance from '../../Layout/admin/Attendance/TakeAttendance';
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
            <Grid item xs={false} md={3} />
            <Grid item container xs={12} md={6}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user/SignUp" component={SignUp} />
                <Route exact path="/event/:id" component={EventDetails} />
                <Route exact path="/user/login" component={Login} />
                <Route exact path="/user/profile" component={Profile} />
                <Route
                  exact
                  path="/admin/TakeAttendance"
                  component={TakeAttendance}
                />
              </Switch>
            </Grid>
            <Grid item xs={false} md={3} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}
