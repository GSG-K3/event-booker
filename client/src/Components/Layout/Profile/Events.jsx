import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  makeStyles,
  Grid,
  Typography,
  Avatar,
  Paper,
  Box,
} from '@material-ui/core';
import { EventNote, FullscreenExit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { green, red, blue, orange } from '@material-ui/core/colors';

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
  eventLink: {
    color: orange[500],
    'text-decoration': 'none',
    '&:hover': { color: theme.palette.primary.main },
  },
}));

export default ({ events }) => {
  const classes = userInfoStyle();
  const userEvents =
    events.length === 0 ? (
      <Paper elevation={6}>
        <Box p={3}>
          <Typography variant="h6" gutterBottom align="center">
            You Are not Enrolled in Any Event
          </Typography>
        </Box>
      </Paper>
    ) : (
      events.map((event, index) => {
        const statusColor =
          event.event_status === 'open'
            ? classes.open
            : event.event_status === 'finised'
            ? classes.Finised
            : event.event_status === 'canceled'
            ? classes.canceled
            : classes.hideen;
        return (
          <div>
            <Link
              key={index}
              to={`/event/${event.gid}`}
              className={classes.eventLink}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <EventNote color="disabled" fontSize="large" />
                </ListItemAvatar>
                <ListItemText
                  primary={event.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="div"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        DateTime
                        {' — '}{' '}
                        {new Date(event.event_date).toLocaleDateString()}{' '}
                        {event.event_time}
                      </Typography>
                      <Typography
                        component="div"
                        variant="body2"
                        color="textPrimary"
                      >
                        Event Code {' — '} {event.code}
                      </Typography>
                      <Typography
                        component="div"
                        variant="body2"
                        color="textPrimary"
                        className={classes.statusEvent}
                      >
                        Event Status {' — '}
                        <Avatar
                          component="span"
                          className={clsx(classes.small, statusColor)}
                        >
                          s
                        </Avatar>
                        {event.event_status}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </Link>
          </div>
        );
      })
    );

  return (
    <Grid container>
      <List className={classes.eventRoot}>{userEvents}</List>
    </Grid>
  );
};
