import clsx from 'clsx';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff,
  KeyboardBackspace,
  DeleteSweep,
  Save,
} from '@material-ui/icons';

import LoaderProgress from '../../../Common/LoaderProgress';

const inputObj = {
  password: '',
  isValid: true,
  message: '',
  minLength: 6,
  showPassword: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default ({ userInfo, setIsLoading }) => {
  const [currentPass, setCurrentPass] = React.useState(inputObj);
  const [newPass, setNewPass] = React.useState(inputObj);
  const [reNewPass, setReNewPass] = React.useState(inputObj);

  const handleChange = (prop) => (event) => {
    switch (prop) {
      case 'password':
        setCurrentPass({ ...currentPass, ['password']: event.target.value });
        break;
      case 'newPassword':
        setNewPass({ ...newPass, ['password']: event.target.value });
        break;
      case 'reNewPassword':
        setReNewPass({ ...reNewPass, ['password']: event.target.value });
        break;
    }
  };

  const handleClickShowPassword = (prop) => (event) => {
    switch (prop) {
      case 'password':
        setCurrentPass({
          ...currentPass,
          showPassword: !currentPass.showPassword,
        });
        break;
      case 'newPassword':
        setNewPass({ ...newPass, showPassword: !newPass.showPassword });
        break;
      case 'reNewPassword':
        setReNewPass({ ...reNewPass, showPassword: !reNewPass.showPassword });
        break;
    }
  };

  // password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClearValues = () => {
    setCurrentPass(inputObj);
    setNewPass(inputObj);
    setReNewPass(inputObj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true, true);
    let formValid = true;
    const currentPassword = { ...currentPass };

    const newPassword = { ...newPass };

    const reNewPassword = { ...reNewPass };

    if (!currentPassword.password) {
      currentPassword.message = 'The Current Password is Required';
      currentPassword.isValid = false;
      formValid = false;
    } else if (currentPassword.password.length < currentPassword.minLength) {
      currentPassword.message = `The Current Password must contains at least ${currentPassword.minLength} chart `;
      currentPassword.isValid = false;
      formValid = false;
    } else {
      currentPassword.message = '';
      currentPassword.isValid = true;
    }

    if (!newPassword.password) {
      newPassword.message = 'The New Password is Required';
      newPassword.isValid = false;
      formValid = false;
    } else if (newPassword.password.length < newPassword.minLength) {
      newPassword.message = `The New Password must contains at least ${newPassword.minLength} chart `;
      newPassword.isValid = false;
      formValid = false;
    } else {
      newPassword.message = '';
      newPassword.isValid = true;
    }

    if (!reNewPassword.password) {
      reNewPassword.message = 'The re-new Password is Required';
      reNewPassword.isValid = false;
      formValid = false;
    } else if (reNewPassword.password.length < reNewPassword.minLength) {
      reNewPassword.message = `The re-new Password must contains at least ${reNewPassword.minLength} chart `;
      reNewPassword.isValid = false;
      formValid = false;
    } else {
      reNewPassword.message = '';
      reNewPassword.isValid = true;
    }

    setCurrentPass(currentPassword);
    setNewPass(newPassword);
    setReNewPass(reNewPassword);

    if (!formValid) {
      setIsLoading(false, true);
      return;
    }

    axios
      .post(`/api/user/changePassword`, {
        currentPass: currentPass.value,
        newPass: newPass.value,
        reNewPass: reNewPass.value,
      })
      .then((result) => {
        const data = result.data;
        console.log({ ...result });
        setIsLoading(false, true);
        //swal(data.messag);
      })
      .catch((err) => {
        console.log('Error', { ...err });
        setIsLoading(false, true);
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
      });
  };

  const classes = useStyles();

  return (
    <Box component="div" width={1}>
      <Grid container justify="center">
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          method="post"
        >
          <Grid container item>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary">
                Chnage your password
              </Typography>
            </Grid>

            <Grid
              container
              item
              direction="column"
              alignContent="center"
              alignItems="center"
            >
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!currentPass.isValid}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={currentPass.showPassword ? 'text' : 'password'}
                  value={currentPass.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('password')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {currentPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {currentPass.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!newPass.isValid}
              >
                <InputLabel htmlFor="new-password">New Password</InputLabel>
                <Input
                  id="new-password"
                  type={newPass.showPassword ? 'text' : 'password'}
                  value={newPass.password}
                  onChange={handleChange('newPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('newPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {newPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {newPass.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!reNewPass.isValid}
              >
                <InputLabel htmlFor="re-new-password">
                  re-New Password
                </InputLabel>
                <Input
                  id="re-new-password"
                  type={reNewPass.showPassword ? 'text' : 'password'}
                  value={reNewPass.password}
                  onChange={handleChange('reNewPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('reNewPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {reNewPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {reNewPass.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid container item justify="center">
              <Grid container item xs={6} justify="flex-end">
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
              <Grid container item xs={6}>
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleClearValues}
                    startIcon={<DeleteSweep />}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
