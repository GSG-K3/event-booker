import React from 'react';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, makeStyles, Grid } from '@material-ui/core';
import {
  DateRange,
  Person,
  Phone,
  AlternateEmail,
  AccountBalance,
  BusinessCenter,
  Business,
  Home,
  BusinessSharp,
} from '@material-ui/icons';

const userInfoStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default ({ userInfo }) => {
  const { user_name, phone, birth_date, email, university, address, profession } = userInfo;
  const classes = userInfoStyle();
  return (
    <Grid container>
      <List className={classes.root}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Person color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={user_name} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Phone color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={phone} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="center">
          <ListItemAvatar>
            <AlternateEmail color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={email} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />{' '}
        <ListItem alignItems="center">
          <ListItemAvatar>
            <DateRange color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={birth_date} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="center">
          <ListItemAvatar>
            <AccountBalance color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={university} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="center">
          <ListItemAvatar>
            <BusinessCenter color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={profession} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Home color="disabled" fontSize="large" />
          </ListItemAvatar>
          <ListItemText primary={address} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
      </List>
    </Grid>
  );
};
