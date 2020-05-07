import React, { Component } from 'react';
import { Grid, Box, Typography, Card, CardContent } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { EventNote } from '@material-ui/icons';
import EventCard from '../../../Common/Event/EventCard';
import LoaderProgress from '../../../Common/LoaderProgress';
import EventDefaultImg from '../../../../assets/eventDefaultimg.svg';

import HomeStyle from './HomeStyle';
import Axios from 'axios';

class Home extends Component {
  state = {
    eventInDay: [
      {
        id: '1',
        title: 'code for everyone',
        host: 'Ruba',
        event_date: '5/5/2020',
        event_time: '5:00 PM',
      },
      {
        id: '1',
        title: 'code for everyone',
        host: 'Ruba',
        event_date: '5/5/2020',
        event_time: '5:00 PM',
      },
    ],
    isLoading: true,
  };

  componentDidMount() {
    Axios.get('/api/admin/getEventsDay')
      .then((result) => {
        console.log('getEventsDay : ', result);
      })
      .catch((err) => console.log({ ...err }));
    this.setState({ isLoading: false });
  }
  render() {
    const { classes } = this.props;
    const { eventInDay, isLoading } = this.state;
    const displayStatus = isLoading ? 'none' : 'block';

    const cardEvent = eventInDay.map((event, index) => {
      return (
        <EventCard
          key={index}
          id={event.gid}
          type="takeAttendance"
          title={event.title}
          hostBy={event.host}
          eventDate={new Date(event.event_date).toLocaleDateString()}
          eventTime={event.event_time}
          imageurl={EventDefaultImg}
        />
      );
    });

    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Grid container justify="center">
          <Grid container item justify="space-between">
            <Grid item xs={6} justify="flex-start">
              <Box pb={2}>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.eventTitle}
                >
                  Events Day
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              justify="flex-end"
              className={classes.eventDateGrid}
            >
              <Box pb={2}>
                <Card className={classes.dateRoot}>
                  <div className={classes.details}>
                    <CardContent className={classes.cardContent}>
                      <EventNote className={classes.cardIcon} />
                    </CardContent>
                    <div className={classes.dateDiv}>
                      <Typography component="span" className={classes.dateText}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </Box>
            </Grid>
          </Grid>

          <Box Component="div" mt={6} width={1} display={displayStatus}>
            <Grid container item xs={12} justify="center">
              {cardEvent}
            </Grid>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(HomeStyle)(Home);
