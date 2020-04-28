import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Person as PersonIcon, Lock as LockIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import '../../Theme/Css/App.css';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  deepOrange: {
    color: deepOrange[400],
  },
  right: { 'text-align': 'right' },
});

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Box p={3}>
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
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PersonIcon color="textSecondary" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" placeholder="Enter your name..." />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LockIcon color="textSecondary" />
          </Grid>
          <Grid item>
            <TextField
              id="standard-basic"
              placeholder="Enter your password..."
            />
          </Grid>
        </Grid>
        <Grid>
          <Box mt={1} align="right">
            <Typography
              variant="button"
              align="right"
              className={classes.deepOrange}
            >
              Forgot
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box classes={{ root: classes.root }} m={4}>
            <Button size="large" color="primary" variant="contained">
              Login
            </Button>
          </Box>
        </Grid>
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
    );
  }
}
export default withStyles(useStyles)(Login);
