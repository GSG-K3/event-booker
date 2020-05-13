import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import {
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  Paper,
  Backdrop,
  Box,
  AppBar,
} from '@material-ui/core';
import EventDefaultImg from './../../../assets/eventDefaultimg.svg';
import EventCardContainer from '../TabContainer';
import LoaderProgress from '../LoaderProgress';
import EventCard from './EventCard';
import IndexTabProps from './../../../helpers/IndexTabProps';

const useStyles = (theme) => ({
  root: {
    flexGrow: 0,
    maxWidth: '100%',
    flexBasis: '50%',
    backgroundColor: theme.palette.background.paper,
  },
});

class EventContainer extends Component {
  state = {
    tabIndex: 0,
    direction: 'ltr',
    isLoading: true,
    eventData: [],
  };

  finishLoading = () => {
    const { isLoading } = this.state;

    if (isLoading) {
      this.setState({ isLoading: false });
    }
  };
  componentDidMount() {
    axios
      .get('/api/envet/getupComingEvent')
      .then((result) => {
        this.setState({ eventData: result.data.data });
      })
      .catch((err) => {
        console.log('Error ', err);
        alert(err.response.data.messag);
      });
  }

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  render() {
    const { classes } = this.props;
    const { tabIndex, direction, eventData, isLoading } = this.state;
    const displayStatus = isLoading ? 'none' : 'block';
    const eventCardContainer = [];
    // build Tab with Event Card Container
    const eventTab = eventData.map((item, index) => {
      // Create Event Card for each Tab
      const eventCard = item.events.map((event, eventIndex) => {
        return (
          <EventCard
            key={eventIndex.toString()}
            id={event.gid}
            title={event.title}
            hostBy={event.host}
            eventDate={new Date(event.event_date).toLocaleDateString()}
            eventTime={new Date(
              '1970-01-01T' + event.event_time,
            ).toLocaleTimeString()}
            imageurl={EventDefaultImg}
          />
        );
      });

      // create Event Card Container and Add Event Card Children
      eventCardContainer.push(
        <EventCardContainer
          value={tabIndex}
          index={index}
          key={item.id.toString()}
        >
          <Grid container>{eventCard}</Grid>
        </EventCardContainer>,
      );
      if (index === eventData.length - 1) {
        this.finishLoading();
      }
      return (
        <Tab
          key={item.id.toString()}
          label={item.catg_name}
          {...IndexTabProps(item.id)}
        />
      );
    });

    return (
      <div className={classes.root}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus}>
          <AppBar color="default" position="relative">
            <Tabs
              value={tabIndex}
              indicatorColor="secondary"
              textColor="primary"
              onChange={this.TabChangeHandler}
              variant="scrollable"
              scrollButtons="on"
              aria-label="scrollable force tabs example"
            >
              {eventTab}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIndex}
            disableLazyLoading={false}
            disabled={true}
          >
            {eventCardContainer}
          </SwipeableViews>
        </Box>
      </div>
    );
  }
}

export default withStyles(useStyles)(EventContainer);
