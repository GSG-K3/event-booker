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
import { KeyboardBackspace } from '@material-ui/icons';
import swal from 'sweetalert';
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
    eventdetail: null,
    isEnrolled: false,
    userCode: null,
    redirect: false,
    isLoading: true,
    displayBlock: false,
  };

  getEventDetail = () => {
    const id = this.props.match.params.id;
    return axios.get(`/api/event/${id}`);
  };

  getUserCode = () => {
    const AuthToken = Cookies.get('AuthToken');
    if (AuthToken) {
      const id = this.props.match.params.id;
      return axios.get(`/api/user/userCode/${id}`);
    }
  };
  handleBack = () => {
    // to return the user from where he comes
    this.props.history.goBack();
  };

  componentDidMount() {
    axios
      .all([this.getEventDetail(), this.getUserCode()])
      .then(
        axios.spread((eventDetail, userCode) => {
          let code = null;
          if (userCode) {
            code = !userCode.data.data.userEvent
              ? null
              : userCode.data.data.userEvent.code;
          }

          const detail =
            eventDetail.data.data.length === 0
              ? null
              : eventDetail.data.data[0];
          this.setState({
            eventdetail: detail,
            userCode: code,
            isEnrolled: !code ? false : true,
            isLoading: false,
          });
        }),
      )
      .catch((err) => {
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        console.log({ ...err });
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect push to="/user/login" />;
    }
  };

  handleEnrollEvent = () => {
    const id = this.props.match.params.id;
    const AuthToken = Cookies.get('AuthToken');

    if (!AuthToken) {
      // user not login
      this.props.history.push({
        pathname: '/user/login',
        search: `?ReturnUrl=/event/${id}`,
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
        if (result.status === 401) {
          swal('Error', result.messag, 'error');

          this.props.history.push({
            pathname: '/user/login',
            search: `?ReturnUrl=/event/${id}`,
          });
          return;
        }
        if (result.status !== 200) {
          swal('Error', result.messag, 'error');
          return;
        }

        swal('Success Enroll', result.messag, 'success');

        this.setState({
          isEnrolled: true,
          userCode: result.data.userCode,
          isLoading: false,
        });
      })
      .catch((err) => {
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        console.log('axios Error Enroll Event : ', err);
      });
  };

  handleCancelRegistration = () => {
    // update state to diplay loading progress
    this.setState({ isLoading: true, displayBlock: true });

    const id = this.props.match.params.id;
    axios
      .delete('/api/event/cancelPlace', { data: { eventId: id } })
      .then((res) => {
        const result = res.data;
        if (result.status === 401) {
          swal('Error', result.messag, 'error');
          this.props.history.push({
            pathname: '/user/login',
            search: `?ReturnUrl=/event/${id}`,
          });
          return;
        }
        if (result.status !== 200) {
          swal('Error', result.messag, 'error');
          return;
        }

        swal('Success Cancel', result.messag, 'success');

        this.setState({
          isEnrolled: false,
          userCode: null,
          isLoading: false,
        });
      })
      .catch((err) => {
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        console.log('axios Error Cancle Place in  Event : ', err);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      isEnrolled,
      userCode,
      displayBlock,
      eventdetail,
    } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    const event = !eventdetail ? (
      <Box p={3}>
        <Typography variant="h6" align="center">
          Sorry Some Error happened at get Event Data
        </Typography>
      </Box>
    ) : (
      <Box p={6}>
        <Grid item xs={12}>
          <Typography variant="h6">{eventdetail.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" className={classes.red}>
            Hosted by: {eventdetail.host}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box my={3}>
            <Typography variant="body1" align="justify">
              {eventdetail.description}
            </Typography>
          </Box>
        </Grid>

        <Grid container spacing={1}>
          <Grid item>
            <EventNoteIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">
              {new Date(eventdetail.event_date).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <QueryBuilderIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">
              {new Date(
                '1970-01-01T' + eventdetail.event_time,
              ).toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <RoomIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">{eventdetail.event_location}</Typography>
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
              onClick={this.handleEnrollEvent}
            >
              Take a place
            </Button>
          </Box>
        </Grid>

        <Grid item>
          <Box
            classes={{ root: classes.root }}
            mt={4}
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
              onClick={this.handleCancelRegistration}
              className={classes.btnCancel}
            >
              Cancel Registration
            </Button>
          </Box>
        </Grid>
      </Box>
    );

    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={6} width={1}>
          <Grid container justify="center">
            <Paper elevation={3}>
              {event}
              <Grid item>
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={this.handleBack}
                    startIcon={<KeyboardBackspace />}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(useStyles)(EventDetails);
