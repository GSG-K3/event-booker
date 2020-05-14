import React, { Component } from 'react';
import { Grid, Box, Typography, Paper, List } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  QueryBuilder as QueryBuilderIcon,
  Room as RoomIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import LoaderProgress from '../../Common/LoaderProgress';
import EventMembers from './EventMembers/EventMembers';
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

class AdminEventDetails extends Component {
  state = {
    eventDetail: {},
    eventMember: [],
    isEnrolled: false,
    userCode: null,
    redirect: false,
    isLoading: true,
    displayBlock: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/admin/eventDetail/${id}`)
      .then((result) => {
        const resData = result.data.data;
        this.setState({
          eventDetail: resData.event,
          eventMember: resData.eventMember,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.messag);
        this.setState({ isLoading: false });
      });
  }

  buildMember = (eventMember) => {
    console.log('eventMember : ', eventMember);
    return !eventMember || eventMember.length === 0 ? (
      <Paper elevation={6}>
        <Box p={3}>
          <Typography variant="h6" gutterBottom align="center">
            There is not any member in this event
          </Typography>
        </Box>
      </Paper>
    ) : (
      eventMember.map((member, index) => {
        const takeCode = member.attendance_status ? member.code : '';
        return (
          <EventMembers
            key={index}
            gid={member.gid}
            user_name={member.user_name}
            code={takeCode}
            attendance_status={member.attendance_status}
            showCodeField={false}
            onClick={this.handlerAttendanceCode}
          />
        );
      })
    );
  };

  render() {
    const { classes } = this.props;
    const { isLoading, displayBlock, eventDetail, eventMember } = this.state;
    const {
      gid,
      title,
      category_id,
      description,
      event_date,
      event_time,
      event_location,
      event_status,
      host,
      member_cnt,
      attendance_cnt,
    } = eventDetail;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
    return (
      <Box component="div" width={1} p={3}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={6}>
          <Grid container justify="center">
            <Box width={1}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" justify="flex-start">
                      Event Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      display="block"
                      className={classes.red}
                    >
                      Hosted by: {host}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box my={3}>
                      <Typography variant="body2" align="justify">
                        {description}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container item spacing={1} justify="space-around">
                    <Grid container spacing={1} alignItems="flex-end" xs={6}>
                      <Grid item>
                        <RoomIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" display="block">
                          {event_location}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} justify="flex-end" xs={6}>
                      <Grid item>
                        <EventNoteIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" display="block">
                          {new Date(event_date).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
            <Box width={1} mt={3}>
              <List className={classes.root}>
                {this.buildMember(eventMember)}
              </List>
            </Box>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(useStyles)(AdminEventDetails);
