import React, { Component } from 'react';
import { Grid, Box, Typography, Button, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  QueryBuilder as QueryBuilderIcon,
  Room as RoomIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import LoaderProgress from './../Common/LoaderProgress';
import '../../Theme/Css/App.css';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  red: {
    color: red[500],
  },
  btnCancel: {
    borderRadius: 15,
    width: 230,
    height: 33,
    background: '#FBF3F1',
    border: '1px solid #F6554D',
    fontWeight: 900,
    fontSize: 16,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#F6554D',
  },
});

class EventDetails extends Component {
  state = {
    eventdetail: [],
    isEnrolled: false,
    userCode: null,
    redirect: false,
    isLoading: true,
    displayBlock: false,
  };

  getEventDetail = () => {
    const id = this.props.match.params.id;
    console.log('start get Event Details id = > ', id);
    return axios.get(`/api/event/${id}`);
  };

  getUserCode = () => {
    console.log('start user code');
    const AuthToken = Cookies.get('AuthToken');
    if (AuthToken) {
      const id = this.props.match.params.id;
      console.log('user Auth then start => id : ', id);
      return axios.get(`/api/user/userCode/${id}`);
    }
  };

  componentDidMount() {
    console.log('start component Did Mount');
    axios.all([this.getEventDetail(), this.getUserCode()]).then(
      axios.spread((eventDetail, userCode) => {
        console.log('eventDetail : ', eventDetail.data);
        console.log('userCode :', userCode.data.data);

        console.log('!userCode.data.data.code', !userCode.data.data);

        const code = !userCode.data.data ? null : userCode.data.data.code;
        console.log('code code : ', code);
        this.setState({
          eventdetail: eventDetail.data.data[0],
          userCode: code,
          isEnrolled: !code ? false : true,
          isLoading: false,
        });
      })
    );
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect push to="/user/login" />;
    }
  };

  EnrollEventHandler = () => {
    const id = this.props.match.params.id;
    const AuthToken = Cookies.get('AuthToken');

    if (!AuthToken) {
      // user not login
      this.props.history.push({
        pathname: '/user/login',
        search: `?redirecturl=/event/${id}`,
      });
      return;
    }

    // update state to diplay loading progress
    this.setState({ isLoading: true, displayBlock: true });

    // post requet to enroll in event , and take the Code
    axios
      .post('/api/event/takePlace', { eventId: id })
      .then((res) => {
        const result = res.data;
        console.log(res.data);
        if (result.status === 401) {
          alert(result.messag);
          this.props.history.push({
            pathname: '/user/login',
            search: `?redirecturl=/event/${id}`,
          });
          return;
        }
        if (result.status !== 200) {
          alert(result.messag);
          return;
        }

        alert(result.messag);
        alert('code ' + result.data.userCode);
        this.setState({
          isEnrolled: true,
          userCode: result.data.userCode,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log('axios Error Enroll Event : ', err);
      });
  };

  CancelRegistrationHandler = () => {};

  render() {
    const { classes } = this.props;
    const { isLoading, isEnrolled, userCode, displayBlock } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
    const userEnroll = isEnrolled ? 'block' : 'none';

    console.log(this.state);

    return (
      <Box component="div">
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={6}>
          <Paper elevation={3}>
            <Box p={6}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {this.state.eventdetail.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7" className={classes.red}>
                  Hosted by: {this.state.eventdetail.host}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box my={3}>
                  <Typography variant="body1" align="justify">
                    {this.state.eventdetail.description}
                  </Typography>
                </Box>
              </Grid>

              <Grid container spacing={1}>
                <Grid item>
                  <EventNoteIcon />
                </Grid>
                <Grid item>
                  <Typography variant="h7">
                    {this.state.eventdetail.event_date}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <QueryBuilderIcon />
                </Grid>
                <Grid item>
                  <Typography variant="h7">
                    {this.state.eventdetail.event_time}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <RoomIcon />
                </Grid>
                <Grid item>
                  <Typography variant="h7">
                    {this.state.eventdetail.event_location}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Box
                  classes={{ root: classes.root }}
                  m={4}
                  display={isEnrolled ? 'none' : 'block'}
                >
                  {this.renderRedirect()}
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={this.EnrollEventHandler}
                  >
                    Take a place
                  </Button>
                </Box>
              </Grid>

              <Grid item>
                <Box
                  classes={{ root: classes.root }}
                  m={4}
                  display={isEnrolled ? 'block' : 'none'}
                >
                  <Box m={1} p={1}>
                    <Paper variant="outlined">
                      <Box p={1}>{userCode}</Box>
                    </Paper>
                  </Box>
                  {this.renderRedirect()}
                  <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={this.CancelRegistrationHandler}
                    className={classes.btnCancel}
                  >
                    Cancel Registration
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }
}
export default withStyles(useStyles)(EventDetails);
