import React from 'react';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, makeStyles, Grid, Typography, Avatar } from '@material-ui/core';
import { EventNote, FullscreenExit } from '@material-ui/icons';
import clsx from 'clsx';

import { green, red, blue } from '@material-ui/core/colors';

const userInfoStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  statusEvent: { display: 'flex' },
  small: { width: 18, height: 18, margin: '5px 11px' },
  open: { backgroundColor: blue[500], color: blue[500] },
  Finised: { backgroundColor: green[500], color: green[500] },
  canceled: { backgroundColor: red[500], color: red[500] },
  hideen: { display: 'none' },
}));

export default ({ events }) => {
  const classes = userInfoStyle();
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
<<<<<<< HEAD
      <List className={classes.eventRoot}>{userEvents}</List>
=======
      <List className={classes.root}>{userEvents}</List>
>>>>>>> master
    </Grid>
  );
};
