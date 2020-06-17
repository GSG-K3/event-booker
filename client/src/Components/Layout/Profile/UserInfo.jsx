import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  makeStyles,
  Grid,
  Box,
  Button,
} from '@material-ui/core';
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
  Edit,
} from '@material-ui/icons';
import userInfoStyle from './ProfileStyles';

export default ({ userInfo }) => {
  const {
    user_name,
    phone,
    birth_date,
    email,
    university,
    address,
    profession,
  } = userInfo;
  const classes = userInfoStyle();
  return (
    <Grid container className={classes.savebtn}>
      <Grid item xs={6}>
        <Box m={4} alignItems="right">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            // onChange={}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </Box>
      </Grid>
      {/* ********






      ********** */}

      <List className={classes.userRoot}>
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
          <ListItemText primary={new Date(birth_date).toLocaleDateString()} />
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
