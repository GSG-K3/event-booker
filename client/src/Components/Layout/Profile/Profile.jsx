import React, { Component } from 'react';
import { Grid, Box, Paper, Avatar, Tabs, Tab } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import UserAvatar from './../../Common/Header/UserAvatar';
import LoaderProgress from '../../Common/LoaderProgress';
import ProfileTabContainer from '../../Common/TabContainer';
import IndexTabProps from '../../../helpers/IndexTabProps';
import UserInfo from './UserInfo';
import ProfileStyles from './ProfileStyles';
import Events from './Events';

class Profile extends Component {
  state = {
    tabIndex: 0,
    userEvent: [
      {
        gid: 'sdfdsf',
        title: 'event title',
        event_date: '18/8/2020',
        event_time: '5:00',
        event_status: 'open',
        code: 'f4d5sdf',
      },
      {
        gid: 'sdfdsf',
        title: 'event title',
        event_date: '18/8/2020',
        event_time: '5:00',
        event_status: 'Finised',
        code: 'Qdfg345',
      },
      {
        gid: 'sdfdsf',
        title: 'event title',
        event_date: '18/8/2020',
        event_time: '5:00',
        event_status: 'canceled',
        code: '45gRSrf',
      },
    ],
    userInfo: {
      user_name: 'Mohamend AAAAA',
      phone: '0598522552',
      birth_date: '15/8/1990',
      email: 'test@no.com',
      university: 'PPu',
      address: 'Hebron',
      profession: 'Potato',
      email_activate: false,
      phone_activate: false,
    },
    isLoading: true,
    displayBlock: false,
    direction: 'ltr',
  };

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, displayBlock, userInfo, tabIndex, direction, userEvent } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    return (
      <Box component="div" width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={2} width={1}>
          <Grid container justify="center">
            <Grid container item xs={12} justify="center">
              <UserAvatar showAvatar={true} Name="Yako Hamm" cssClass={classes.large} />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Box Component="div" mt={6}>
                <Paper square position="relative">
                  <Tabs value={tabIndex} indicatorColor="secondary" textColor="primary" onChange={this.TabChangeHandler} variant="fullWidth">
                    <Tab label="info" {...IndexTabProps(0)} />
                    <Tab label="Events" {...IndexTabProps(1)} />
                    {/* <Tab label="Setting" {...IndexTabProps(2)} /> */}
                  </Tabs>
                </Paper>
                <SwipeableViews axis={direction === 'rtl' ? 'x-reverse' : 'x'} index={tabIndex} disableLazyLoading={false}>
                  <ProfileTabContainer value={tabIndex} index={0}>
                    <Grid container>
                      <UserInfo userInfo={userInfo} />
                    </Grid>
                  </ProfileTabContainer>
                  <ProfileTabContainer value={tabIndex} index={1}>
                    <Grid container>
                      <Events events={userEvent} />
                    </Grid>
                  </ProfileTabContainer>
                  {/* <ProfileTabContainer value={tabIndex} index={2}>
                    <Grid container>Setting</Grid>
                  </ProfileTabContainer> */}
                </SwipeableViews>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(ProfileStyles)(Profile);
