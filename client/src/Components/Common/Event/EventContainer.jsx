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
} from '@material-ui/core';
import EventDefaultImg from './../../../assets/eventDefaultimg.svg';
import EventCardContainer from './EventCardContainer';
import LoaderProgress from '../LoaderProgress';
import EventCard from './EventCard';

export default class EventContainer extends Component {
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
        console.log('Data from Server : ', result.data.data);
        this.setState({ eventData: result.data.data });
      })
      .catch((err) => {
        console.log('Error ', err);
        alert('Sorry Some Error Happened , try to contact us');
      });
  }

  IndexTabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  render() {
    const { tabIndex, direction, eventData, isLoading } = this.state;
    const displayStatus = isLoading ? 'none' : 'block';
    const eventCardContainer = [];
    // build Tab with Event Card Container
    console.log('mpa is starte');
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
            eventTime={event.event_time}
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
        </EventCardContainer>
      );
      if (index === eventData.length - 1) {
        console.log('last time');
        this.finishLoading();
      }
      return (
        <Tab
          key={item.id.toString()}
          label={item.catg_name}
          {...this.IndexTabProps(item.id)}
        />
      );
    });

    return (
      <div>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus}>
          <Paper square position="relative">
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
          </Paper>
          <SwipeableViews
            axis={direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIndex}
            disableLazyLoading={false}
          >
            {eventCardContainer}
          </SwipeableViews>
        </Box>
      </div>
    );
  }
}
