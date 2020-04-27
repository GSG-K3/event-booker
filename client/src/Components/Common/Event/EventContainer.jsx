import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core';
import EventDefaultImg from './../../../assets/eventDefaultimg.svg';
import EventCardContainer from './EventCardContainer';
import EventCard from './EventCard';

export default class EventContainer extends Component {
  state = {
    tabIndex: 0,
    direction: 'ltr',
    category: [
      { id: 1, catg_name: 'Code Academy' },
      { id: 2, catg_name: 'Freelancers' },
      { id: 3, catg_name: 'start up' },
      { id: 4, catg_name: 'Public' },
    ],
    Events: [
      {
        gid: '1',
        title: 'Code for everyOne',
        category_id: '1',
        event_date: '15/5/2020',
        event_time: '5:00 PM',
        host: 'Rube',
      },
    ],
  };

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
    const { tabIndex, direction, category } = this.state;
    const tab = category.map((item) => {
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
        <div>
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
              {tab}
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIndex}
            disableLazyLoading={false}
          >
            <EventCardContainer value={tabIndex} index={0}>
              <Grid container>
                <EventCard
                  id={this.state.Events[0].gid}
                  title={this.state.Events[0].title}
                  hostBy={this.state.Events[0].host}
                  eventDate={this.state.Events[0].event_date}
                  eventTime={this.state.Events[0].event_time}
                  imageurl={EventDefaultImg}
                />
                <EventCard
                  id={this.state.Events[0].gid}
                  title={this.state.Events[0].title}
                  hostBy={this.state.Events[0].host}
                  eventDate={this.state.Events[0].event_date}
                  eventTime={this.state.Events[0].event_time}
                  imageurl={EventDefaultImg}
                />
                <EventCard
                  id={this.state.Events[0].gid}
                  title={this.state.Events[0].title}
                  hostBy={this.state.Events[0].host}
                  eventDate={this.state.Events[0].event_date}
                  eventTime={this.state.Events[0].event_time}
                  imageurl={EventDefaultImg}
                />
                <EventCard
                  id={this.state.Events[0].gid}
                  title={this.state.Events[0].title}
                  hostBy={this.state.Events[0].host}
                  eventDate={this.state.Events[0].event_date}
                  eventTime={this.state.Events[0].event_time}
                  imageurl={EventDefaultImg}
                />
                <EventCard
                  id={this.state.Events[0].gid}
                  title={this.state.Events[0].title}
                  hostBy={this.state.Events[0].host}
                  eventDate={this.state.Events[0].event_date}
                  eventTime={this.state.Events[0].event_time}
                  imageurl={EventDefaultImg}
                />
              </Grid>
            </EventCardContainer>
            <EventCardContainer value={tabIndex} index={1}>
              Item Two
            </EventCardContainer>
            <EventCardContainer value={tabIndex} index={2}>
              Item Three
            </EventCardContainer>
            <EventCardContainer value={tabIndex} index={3}>
              Item Foure
            </EventCardContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}
