import React, { Component } from 'react';
import { Grid, Box, Typography, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Person, EventNote } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';
import LoaderProgress from '../../../Common/LoaderProgress';
import UserInfoDialog from './UserInfoDialog';
import EventMembers from '../EventMembers/EventMembers';
import AttendanceStyle from './Style';
import Axios from 'axios';

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
    eventMember: [
      {
        gid: '324',
        user_name: 'Yakoob Hamo',
        attendance_status: false,
        userCode: '',
      },
      {
        gid: '341',
        user_name: 'Tesssst  Abcde  2',
        attendance_status: true,
        userCode: 'FR7GD',
      },
      {
        gid: '13',
        user_name: 'Tesss GHMFWD 3',
        attendance_status: false,
        userCode: '',
      },
    ],
    eventMemberInfo: [
      {
        gid: '324',
        user_name: 'Yakoob Hamo',
        phone: '0598235641',
        birth_date: '5/5/2020',
        email: 'test@no.com',
        university: 'PPU',
        address: 'Hebron',
        profession: 'Developer',
      },
    ],
    isLoading: true,
    displayBlock: false,
    open: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    Axios.get(`/api/admin/event/TakeAttendance/${id}`)
      .then((result) => {
        console.log(result.data.data);
        //eventInfo, eventMember, eventMemberInfo;
        const data = result.data.data;
        this.setState({
          // event: data.eventInfo,
          // eventMember: data.eventMember,
          // eventMemberInfo: data.eventMemberInfo,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err.response.data.messag);
        this.setState({ isLoading: false });
      });
  }

  handlerAttendanceCode = (code, gid) => {
    if (!code) {
      alert('you must enter the Code ');
      return;
    }
    alert(code + ' ' + gid);
    this.setState({ open: true });
  };
  handlerOk = () => {
    alert('ok');
    this.setState({ open: false });
  };

  handleUpdate = () => {
    alert('cnacel');
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const {
      isLoading,
      displayBlock,
      event,
      eventMember,
      open,
      eventMemberInfo,
    } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    const members = eventMember.map((member, index) => {
      return (
        <EventMembers
          key={index}
          eventMembers={member}
          showCodeField={true}
          gid={member.gid}
          onClick={this.handlerAttendanceCode}
        />
      );
    });

    return (
      <Box component="div" p={3} width={1}>
        <UserInfoDialog
          open={open}
          handleClose={this.handleClose}
          handlerOk={this.handlerOk}
          handleUpdate={this.handleUpdate}
          userInfo={eventMemberInfo[0]}
        />
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
                <Grid container justify="center">
                  <List className={classes.root}>{members}</List>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(AttendanceStyle)(TakeAttendance);
