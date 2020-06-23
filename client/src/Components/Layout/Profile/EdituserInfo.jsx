import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
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
  TextField,
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
  Save,
} from '@material-ui/icons';
import axios from 'axios';
import {
  validateEmail,
  stringValidation,
  phoneValidation,
} from '../../../helpers/Validation';
import userInfoStyle from './ProfileStyles';
import UserInfo from './UserInfo';

export default ({ userInfo, handleSaveClick, displaySave }) => {
  // console.log('prop', props);

  const classes = userInfoStyle();

  const data = { ...userInfo };
  // console.log('data1111', data);
  const [userInformation, setUserInformation] = useState(data);
  const [oldEmail, setEmail] = useState('');
  //console.log(userInformation);

  useEffect(() => {
    console.log(data.email);

    console.log(data);
    setEmail(data.email);
    console.log(oldEmail);
    const fromInput = {};
    for (let key of Object.keys(data)) {
      const input = {};
      input.value = data[key];
      input.message = '';
      input.isValid = true;
      input.isRequired = true;
      fromInput[key] = input;
    }
    setUserInformation(fromInput);
  }, []);
  const handleChange = (event) => {
    const target = event.target;
    const form = { ...userInformation };
    form[target.name].value = target.value;
    setUserInformation(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('bef check');

    let formValid = true;
    const fromInput = { ...userInformation };
    const {
      user_name,
      phone,
      email,
      birth_date,
      university,
      profession,
      address,
    } = fromInput;

    if (!user_name.value.trim()) {
      user_name.message = 'Enter your name, please';
      user_name.isValid = false;
      formValid = false;
    } else if (!stringValidation(user_name.value)) {
      // the name  is not Valid
      user_name.message =
        'Name just contains alphabet characters and just one space between words, Please';
      user_name.isValid = false;
    } else {
      user_name.message = '';
      user_name.isValid = true;
    }

    if (!phone.value.trim()) {
      phone.message = 'Enter your phone number, please';
      phone.isValid = false;
      formValid = false;
    } else if (!phoneValidation(phone.value)) {
      // the phone is not Valid
      phone.message = 'Phone just contains numbers with 10 digits';
      phone.isValid = false;
    } else {
      phone.message = '';
      phone.isValid = true;
    }

    if (email.value.trim() === '') {
      email.message = 'Enter your email, please';
      email.isValid = false;
      formValid = false;
    } else if (!validateEmail(email.value)) {
      // the Email is not Valid
      email.message = 'Enter Valid Email, Please';
      email.isValid = false;
    } else {
      email.message = '';
      email.isValid = true;
    }

    if (!formValid) {
      setUserInformation(fromInput);
      return;
    }
    setUserInformation(fromInput);
    // isLoading:true
    // this.setState({ userInfo: fromInput, isLoading: true });

    const data = {
      user_name: user_name.Value,
      phone: phone.value,
      birth_date: birth_date,
      email: email.value,
      university: university.value,
      address: address.value,
      profession: profession.value,
    };

    // create axios request to check if email used in db or not
    console.log('bef check');
    console.log('old', oldEmail);
    console.log('new', userInformation.email.value);

    if (userInformation.email.value !== oldEmail) {
      axios
        .get(`/api/user/checkUserEmail/${email.value}`)
        .then(() => {
          // alert('check');

          email.message = '';
          email.isValid = true;
          email.isAvailable = true;

          // axios to Create User
          axios
            .put('/api/user/edituserinfo', data)
            .then((req) => {
              const datalog = req.data;
              if (req.data.status !== 200) {
                swal('Error', req.data.messag, 'error');
                return;
              }
              // handleSave...
              handleSaveClick();
              swal('Good job!', req.data.messag, 'success');
              // this.setState({ redirect: true });
              console.log('1111', data);

              alert(datalog.messag);
              console.log('done');
            })
            .catch((err) => {
              alert(err.response.data.messag);
              // this.setState({ isLoading: false });
            });
        })
        .catch((err) => {
          email.message = err.response.data.messag;
          email.isValid = false;
          formValid = false;
          email.isAvailable = false;
          // this.setState({ userInfo: fromInput, isLoading: false });
          console.log({ ...err });
        });
    } else {
      axios
        .post('/api/user/edituserinfo', data)
        .then((req) => {
          const datalog = req.data;
          if (req.data.status !== 200) {
            swal('Error', req.data.messag, 'error');
            return;
          }
          // handleSave...
          handleSaveClick();
          swal('Good job!', req.data.messag, 'success');
          // this.setState({ redirect: true });
          console.log(data);
          alert(datalog.messag);
          console.log('done');
        })
        .catch((err) => {
          alert(err.response.data.messag);
          // this.setState({ isLoading: false });
        });
    }
    console.log('aft check');
  };
  //console.log('user info in render : ', userInformation);
  return (
    <Grid container className={classes.userRoot}>
      <List className={classes.userRoot}>
        <Box>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {/* <form onSubmit={handleSubmit}> */}
            {/* <form> */}
            <Grid item xs={6}>
              <Box m={4} alignItems="right" display={displaySave}>
                <Button
                  type="submit"
                  size="medium"
                  color="primary"
                  variant="contained"
                  // onClick={handleSaveClick}
                  startIcon={<Save />}
                >
                  Save
                </Button>
              </Box>
            </Grid>
            <Grid>
              <Person color="disabled" fontSize="large" />
              <TextField
                name="user_name"
                id="user_name"
                // label="Enter your name "
                value={userInformation.user_name.value}
                error={!userInformation.user_name.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <Phone color="disabled" fontSize="large" />
              <TextField
                name="phone"
                id="phone"
                // label="Enter your name "
                value={userInformation.phone.value}
                error={!userInformation.phone.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <AlternateEmail color="disabled" fontSize="large" />
              <TextField
                name="email"
                id="email"
                // label="Enter your name "
                value={userInformation.email.value}
                error={!userInformation.email.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <DateRange color="disabled" fontSize="large" />
              <TextField
                name="birth_date"
                id="birth_date"
                // label="Enter your name "
                value={userInformation.birth_date.value}
                error={!userInformation.birth_date.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <AccountBalance color="disabled" fontSize="large" />
              <TextField
                name="university"
                id="university"
                // label="Enter your name "
                value={userInformation.university.value}
                error={!userInformation.university.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <BusinessCenter color="disabled" fontSize="large" />
              <TextField
                name="profession"
                id="profession"
                // label="Enter your name "
                value={userInformation.profession.value}
                error={!userInformation.profession.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <Home color="disabled" fontSize="large" />
              <TextField
                name="address"
                id="address"
                // label="Enter your name "
                value={userInformation.address.value}
                error={!userInformation.address.isValid}
                // autoFocus={true}
                required={true}
                // color="secondary"
                // fullWidth={true}
                onChange={handleChange}
              />
            </Grid>
          </form>
        </Box>
      </List>
    </Grid>
  );
};
