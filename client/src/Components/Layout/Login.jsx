import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
} from '@material-ui/core';
import { Person as PersonIcon, Lock as LockIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import '../../Theme/Css/App.css';
import axios from 'axios';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  deepOrange: {
    color: deepOrange[400],
  },
  right: { 'text-align': 'right' },
});

class Login extends Component {
  state = {
    logindata: { email: '', password: '' },
  };

  texthandler = (e) => {
    const form = this.state.logindata;
    form[e.target.name] = e.target.value;
    this.setState({ logindata: form });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`/user/login/`, this.state.logindata).then((req) => {
      const datalog = req.data;
      console.log(datalog);
      if (datalog.status !== 200) {
        alert(datalog.messag);
        return;
      }
      alert(datalog.messag);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Box mt={4}>
        {/* <Paper elevation={3}> */}
        <Box p={2} m={4}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box mb={3}>
              <Typography variant="h10" color="textSecondary">
                Please login to continue
              </Typography>
            </Box>
          </Grid>

          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <PersonIcon color="textSecondary" />
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  name="email"
                  onChange={this.texthandler}
                  placeholder="Enter your name..."
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <LockIcon color="textSecondary" />
              </Grid>
              <Grid item>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  onChange={this.texthandler}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Box classes={{ root: classes.root }} m={4}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </form>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h13">If Its Your First Time</Typography>
            </Grid>
            <Grid item>
              <Link to="/user/Signup">
                <Typography variant="button" className={classes.deepOrange}>
                  SignUp
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* </Paper> */}
      </Box>
    );
  }
}
export default withStyles(useStyles)(Login);
