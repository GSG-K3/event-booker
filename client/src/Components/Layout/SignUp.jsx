import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Person, AlternateEmail, Phone, Lock } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors/';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const userStyle = (theme) => ({
  loginLink: {
    color: orange[500],
    'text-decoration': 'none',
    '&:hover': { color: theme.palette.primary.main },
  },
  signUpBtn: {
    'border-radius': '25px',
    position: 'absolute',
    width: '184px',
    height: '37px',
  },
});

class signUp extends Component {
  state = {
    userdetails: {
      name: '',
      phone: '',
      email: '',
      password: '',
      password2: '',
      selectedDate: new Date('1990-1-1T21:11:54'),
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userdetails.name.trim() === '')
      alert('Enter your name, please');
    else if (this.state.userdetails.phone.trim() === '')
      alert('Enter your phone number,please');
    else if (this.state.userdetails.email.trim() === '')
      alert('Enter your email, please');
    else if (
      this.state.userdetails.password.trim() === '' ||
      this.state.userdetails.password2.trim() === ''
    )
      alert('Enter password, pleas');

    if (this.state.userdetails.password === this.state.userdetails.password2) {
      console.log(this.state);
      console.log('helllooooo');
      axios
        .post('/api/user/signup', this.state.userdetails)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Password not match');
    }
  };

  handleDateChange = (date) => {
    const form = this.state.userdetails;
    form.selectedDate = date;
    this.setState({ userdetails: form });
  };

  handler = (event) => {
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const form = this.state.userdetails;
    form[name] = value;
    this.setState({
      userdetails: form,
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <Box p={3}>
        <Typography variant="h4" color="textSecondary">
          Sign Up
        </Typography>
        <Typography variant="h8" color="textSecondary">
          Please enter your info to continue.
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container item justify="center" direction="column">
            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Person color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    name="name"
                    id="input-with-icon-grid"
                    label="Enter your name "
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Phone color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    name="phone"
                    id="input-with-icon-grid"
                    label="Enter your phone"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AlternateEmail color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Enter your email"
                    name="email"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    type="password"
                    id="input-with-icon-grid"
                    label="Ente your password"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    name="password2"
                    type="password"
                    id="input-with-icon-grid"
                    label="re-enter  your password"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  name="selectedDate"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Enter your birth date "
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Box m={3}>
              <Button
                type="submit"
                className={classes.signUpBtn}
                size="small"
                color="primary"
                variant="contained"
              >
                Sign up
              </Button>
            </Box>
            <Box m={3}>
              <Typography variant="h7" color="primary">
                {'Have an account?  '}
                <Link className={classes.loginLink} to={`/user/login`}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Grid>
        </form>
      </Box>
    );
  }
}

export default withStyles(userStyle)(signUp);
