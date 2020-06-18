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
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let formValid = true;
  //   const fromInput = this.state.userDetails;
  //   const { name, phone, email, password, rePassword } = fromInput;

  //   if (!name.value.trim()) {
  //     name.message = 'Enter your name, please';
  //     name.isValid = false;
  //     formValid = false;
  //   } else if (!stringValidation(name.value)) {
  //     // the name  is not Valid
  //     name.message =
  //       'Name just contains alphabet characters and just one space between words, Please';
  //     name.isValid = false;
  //   } else {
  //     name.message = '';
  //     name.isValid = true;
  //   }

  //   if (!phone.value.trim()) {
  //     phone.message = 'Enter your phone number, please';
  //     phone.isValid = false;
  //     formValid = false;
  //   } else if (!phoneValidation(phone.value)) {
  //     // the phone is not Valid
  //     phone.message = 'Phone just contains numbers with 10 digits';
  //     phone.isValid = false;
  //   } else {
  //     phone.message = '';
  //     phone.isValid = true;
  //   }

  //   if (email.value.trim() === '') {
  //     email.message = 'Enter your email, please';
  //     email.isValid = false;
  //     formValid = false;
  //   } else if (!validateEmail(email.value)) {
  //     // the Email is not Valid
  //     email.message = 'Enter Valid Email, Please';
  //     email.isValid = false;
  //   } else {
  //     email.message = '';
  //     email.isValid = true;
  //   }

  //   if (!formValid) {
  //     this.setState({ userDetails: fromInput });
  //     return;
  //   }

  //   this.setState({ userDetails: fromInput, isLoading: true });

  //   const data = {
  //     name: name.value,
  //     phone: phone.value,
  //     email: email.value,
  //     password: password.value,
  //     rePassword: rePassword.value,
  //     birthDate: this.state.birthDate,
  //   };

  //   // create axios request to check if email used in db or not
  //   axios
  //     .get(`/api/user/checkUserEmail/${email.value}`)
  //     .then(() => {
  //       email.message = '';
  //       email.isValid = true;
  //       email.isAvailable = true;

  //       // axios to Create User
  //       axios
  //         .post('/api/user/edituserinfo', data)
  //         .then((req) => {
  //           const datalog = req.data;
  //           this.setState({ redirect: true });
  //           alert(datalog.messag);
  //         })
  //         .catch((err) => {
  //           alert(err.response.data.messag);
  //           this.setState({ isLoading: false });
  //         });
  //     })
  //     .catch((err) => {
  //       email.message = err.response.data.messag;
  //       email.isValid = false;
  //       formValid = false;
  //       email.isAvailable = false;
  //       this.setState({ userDetails: fromInput, isLoading: false });
  //       console.log({ ...err });
  //     });
  // };
  return (
    <Grid container className={classes.savebtn}>
      <List className={classes.userRoot}>
        <Box>
          {/* <form onSubmit={this.handleSubmit} noValidate autoComplete="off"> */}
          <form>
            <Person color="disabled" fontSize="large" />
            <TextField
              id="standard-required"
              Value={user_name}
              // onChange={handleChange}
            />
          </form>
        </Box>
      </List>
    </Grid>
  );
};
