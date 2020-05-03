import React, { Component } from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Person, EventNote } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';
import LoaderProgress from '../../../Common/LoaderProgress';

import EventMembers from '../EventMembers/EventMembers';
import AttendanceStyle from './Style';

class TakeAttendance extends Component {
  state = {
    tabIndex: 0,
    event: {
      title: 'Code for everyone',
      host: 'Rubaaaaa',
      event_date: '5/24/2020',
      event_time: '5:30 PM',
      member_cnt: 20,
      attendance_cnt: 5,
    },
    userEvent: [
      {
        user_name: 'Tessst Abcd  1',
        attendance_status: false,
        userCode: '',
      },
      {
        user_name: 'Tesssst  Abcde  2',
        attendance_status: true,
        userCode: 'FR7GD',
      },
      {
        user_name: 'Tesss GHMFWD 3',
        attendance_status: false,
        userCode: '',
      },
    ],
    isLoading: true,
    displayBlock: false,
  };

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  codeClickHandler = (code) => {
    alert(code);
  };

  render() {
    const { classes } = this.props;
    const { isLoading, displayBlock, event, userEvent } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    const eventMember = userEvent.map((member, index) => {
      return (
        <EventMembers
          key={index}
          eventMembers={member}
          showCodeField={true}
          codeClickHandler={this.codeClickHandler}
        />
      );
    });

    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Grid
              container
              item
              xs={12}
              justify="flex-start"
              className={classes.eventTitle}
            >
              <Box pb={2}>
                <Typography variant="h6" component="h6">
                  Take Attendance
                </Typography>
              </Box>
            </Grid>
            <Grid container item xs={12} justify="flex-start">
              <Typography
                variant="body1"
                component="h6"
                className={classes.eventTitle}
                color="#686666"
              >
                {event.title}
              </Typography>
            </Grid>
            <Grid container justify="space-between" direction="column">
              <Grid>
                <Grid container spacing={1} sx={4} alignItems="center">
                  <Grid item>
                    <Person style={{ fontSize: 22, color: orange[200] }} />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      className={classes.atteCount}
                    >
                      {event.attendance_cnt} / {event.member_cnt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container spacing={1} sx={4} alignItems="center">
                  <Grid item>
                    <EventNote style={{ fontSize: 22, color: orange[200] }} />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      className={classes.eventDate}
                    >
                      {new Date(event.event_date).toLocaleDateString()}{' '}
                      {event.event_time}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={12} justify="center">
              <Box Component="div" mt={6} width={1}>
                {/* <Paper variant="outlined" position="relative"> */}
                {/* <EventMembers
                  eventMembers={{
                    user_name: 'Yakoob Abd Hammouri',
                    attendance_status: true,
                    userCode: '',
                  }}
                  showCodeField={true}
                  codeClickHandler={this.codeClickHandler}
                /> */}
                {eventMember}
                {/* </Paper> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(AttendanceStyle)(TakeAttendance);
