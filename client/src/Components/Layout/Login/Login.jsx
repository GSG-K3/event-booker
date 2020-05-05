import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormHelperText,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';

import LoaderProgress from '../../Common/LoaderProgress';

import axios from 'axios';
import LoginStyles from './LoginStyle';

class Login extends Component {
  state = {
    logindata: { email: null, password: null },
    isLoading: false,
    displayBlock: true,
    showPassword: false,
    email: {
      Message: '',
      isValid: true,
    },
    password: {
      Message: '',
      isValid: true,
      minLength: 3,
    },
    redirect: false,
    ReturnUrlText: '/',
    SignupLink: '/user/Signup/',
  };

  componentDidMount() {
    const AuthToken = Cookies.get('AuthToken');

    console.log(AuthToken);
    console.log(!AuthToken);
    const qstring = queryString.parse(this.props.history.location.search);
    if (qstring.ReturnUrl) {
      this.setState({
        ReturnUrlText: qstring.ReturnUrl,
        SignupLink: `/user/Signup/?ReturnUrl=${qstring.ReturnUrl}`,
      });
    } else {
      this.setState({
        // if the user log in we will redirect to Home
        redirect: !AuthToken ? false : true,
      });
    }
  }

  renderAction = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.ReturnUrlText} />;
    }
  };

  texthandler = (e) => {
    const form = this.state.logindata;
    form[e.target.name] = e.target.value;
    this.setState({ logindata: form });
  };

  handleClickShowPassword = () => {
    const showPassword = this.state.showPassword;

    this.setState({
      showPassword: !showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, logindata } = this.state;

    if (!logindata.email) {
      email.Message = 'The Email is Required';
      email.isValid = false;
    } else if (!validateEmail(logindata.email)) {
      // the Email is not Valid
      email.Message = 'Please Enter Valid Email';
      email.isValid = false;
    } else {
      email.Message = '';
      email.isValid = true;
    }

    if (!logindata.password) {
      password.Message = 'The Password is Required';
      password.isValid = false;
    } else if (logindata.password.length < password.minLength) {
      password.Message = `The Password must contains at least ${password.minLength} chart `;
      password.isValid = false;
    } else {
      password.Message = '';
      password.isValid = true;
    }

    if (!email.isValid || !password.isValid) {
      this.setState({ email: email, password: password });
      return;
    }

    this.setState({ email: email, password: password, isLoading: true });

    axios.post(`/user/login/`, logindata).then((req) => {
      const datalog = req.data;

      if (datalog.status !== 200) {
        alert(datalog.messag);
        this.setState({ isLoading: false });
        return;
      }

      this.setState({ redirect: true });
      alert(datalog.messag);
    });
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      displayBlock,
      logindata,
      email,
      password,
      showPassword,
      SignupLink,
    } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Paper elevation={3} className={classes.content}>
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
              <Grid item xs={12}>
                <form
                  onSubmit={this.handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Grid
                    container
                    justify="flex-start"
                    className={classes.gutterBottom}
                  >
                    <Grid item>
                      <PersonIcon
                        color="disabled"
                        className={classes.PersonIcon}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="email"
                        name="email"
                        error={!email.isValid}
                        color="secondary"
                        value={logindata.email}
                        onChange={this.texthandler}
                        autoFocus={true}
                        margin={'dense'}
                        required={true}
                        label="Enter your Email"
                      />
                    </Grid>
                    <Grid item>
                      <FormControl error>
                        <FormHelperText
                          id="email-error-text"
                          className={classes.textError}
                        >
                          {email.Message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="flex-end"
                    className={classes.gutterBottom}
                  >
                    <Grid item>
                      <LockIcon
                        color="disabled"
                        className={classes.PasswordIcon}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl className={classes.PasswordText}>
                        <InputLabel htmlFor="standard-adornment-password">
                          Enter your password
                        </InputLabel>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={logindata.password}
                          onChange={this.texthandler}
                          required={true}
                          name="password"
                          error={!password.isValid}
                          color="secondary"
                          label="Enter your password"
                          margin={'dense'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl error>
                        <FormHelperText
                          id="password-error-text"
                          className={classes.textError}
                        >
                          {password.Message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Box mt={1} align="right" display="none">
                      <Typography
                        variant="button"
                        align="right"
                        className={classes.deepOrange}
                        gutterBottom
                      >
                        Forgot
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    {this.renderAction()}
                    <Box classes={{ root: classes.root }} m={4}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={classes.btnLogin}
                      >
                        Login
                      </Button>

                      <Grid container>
                        <Grid item>
                          <Typography
                            component="span"
                            className={classes.signupText}
                          >
                            If Its Your First Time
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Link to={SignupLink}>
                            <Typography
                              variant="span"
                              className={classes.signupLink}
                            >
                              SignUp
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </Box>
    );
  }
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export default withStyles(LoginStyles)(Login);
