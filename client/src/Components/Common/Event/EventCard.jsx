import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';

import { EventNote } from '@material-ui/icons';

import cardStyle from './CardStyle';

export default function EventCard(props) {
  const { id, title, hostBy, eventDate, eventTime, imageurl, type } = props;
  const classes = cardStyle();
  const link =
    type === 'takeAttendance'
      ? `/admin/Event/takeAttendance/${id}`
      : `/event/${id}`;
  return (
    <div>
      <Link className={classes.eventLink} to={link}>
        <Box m={2}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={title}
                height="112"
                image={imageurl}
                title={title}
              ></CardMedia>
              <CardContent className={classes.CardContent}>
                <Grid container direction="column">
                  <Typography
                    variant="subtitle1"
                    component="h1"
                    className={classes.eventTitle}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h4"
                    color="textSecondary"
                    gutterBottom
                    className={classes.hostBy}
                  >
                    Hosted by: {hostBy}
                  </Typography>

                  <Grid container alignItems="center">
                    <EventNote />
                    <Typography
                      variant="h6"
                      component="h6"
                      color="textSecondary"
                      className={classes.eventDate}
                    >
                      {eventDate + ' ' + eventTime}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Box>
      </Link>
    </div>
  );
}
