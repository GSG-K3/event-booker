import React from 'react';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Typography, Avatar } from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import EventStyle from './ProfileStyles';
import clsx from 'clsx';

export default ({ events }) => {
  const classes = EventStyle();
  if (!events)
    return (
      <Typography component="h6" variant="body1">
        you are not registered in any events
      </Typography>
    );
  const userEvents = events.map((event, index) => {
    const statusColor =
      event.event_status === 'open'
        ? classes.open
        : event.event_status === 'Finised'
        ? classes.Finised
        : event.event_status === 'canceled'
        ? classes.canceled
        : classes.hideen;
    return (
      <div>
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <EventNote color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText
            primary={event.title}
            secondary={
              <React.Fragment>
                <Typography component="div" variant="body2" className={classes.inline} color="textPrimary">
                  DateTime
                  {' — '} {new Date(event.event_date).toLocaleDateString()} {event.event_time}
                </Typography>
                <Typography component="div" variant="body2" color="textPrimary">
                  Event Code {' — '} {event.code}
                </Typography>
                <Typography component="div" variant="body2" color="textPrimary" className={classes.statusEvent}>
                  Event Status {' — '}
                  <Avatar component="span" className={clsx(classes.small, statusColor)}>
                    s
                  </Avatar>
                  {event.event_status}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
      </div>
    );
  });

  return (
    <Grid container>
      <List className={classes.eventRoot}>{userEvents}</List>
    </Grid>
  );
};
