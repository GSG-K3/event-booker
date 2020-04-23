import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Paper, Tabs, Tab } from '@material-ui/core';
import EventCardContainer from './EventCardContainer';

export default class EventContainer extends Component {
  state = {
    tabIndex: 0,
    direction: 'ltr',
    category: [
      { id: 1, catg_name: 'Code Academy' },
      { id: 1, catg_name: 'Freelancers' },
      { id: 1, catg_name: 'start up' },
      { id: 1, catg_name: 'Public' },
    ],
    Events: [],
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
      return <Tab label={item.catg_name} {...this.IndexTabProps(item.id)} />;
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
          >
            <EventCardContainer value={tabIndex} index={0}></EventCardContainer>
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
