import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, Paper, TextField, FormControl, Select, InputLabel } from '@material-ui/core';
import { Person as PersonIcon, Lock as LockIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { QueryBuilder as QueryBuilderIcon, Room as RoomIcon, EventNote as EventNoteIcon } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import '../../Theme/Css/App.css';
import axios from 'axios';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  deepOrange: {
    color: deepOrange[400],
  },
  right: { 'text-align': 'right' },
});

class AddNewEvent extends Component {
  state = {
    Eventdata: {
      title: '',
      host: '',
      category_id: 0,
      event_location: '',
      description: '',
      event_date: new Date(),
      event_time: new Date(),
    },
    // selectedDate: new Date('2014-08-18T21:11:54'),
  };
  // deletevalue = () => {
  //   // const form = this.state.Eventdata;
  //   // form[e.target.name] = e.target.value;
  //   this.state.Eventdata.map((e) => {
  //     e.target.value = '';
  //   });
  // };

  handleDateChange = (event, date) => {
    console.log(date);

    const form = this.state.Eventdata;
    form.event_date = date;
    this.setState({ Eventdata: form });
  };
  handleTimeChange = (event, date) => {
    console.log(date);

    const form = this.state.Eventdata;
    form.event_time = new Date('0 ' + date);
    this.setState({ Eventdata: form });
    console.log(this.state.Eventdata.event_time);
  };
  texthandler = (e) => {
    const form = this.state.Eventdata;
    form[e.target.name] = e.target.value;
    this.setState({ Eventdata: form });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`/api/admin/event/addEvent`, this.state.Eventdata).then((req) => {
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
    const { selectedDate } = this.state;
    return (
      <Box mt={4}>
        <Box p={2} m={4}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Add New Event
            </Typography>
          </Grid>

          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid container>
              <Grid item>
                <TextField id="title" name="title" onChange={this.texthandler} placeholder="Event Name" />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <TextField id="host" name="host" onChange={this.texthandler} placeholder="Host" />
              </Grid>
            </Grid>
            <Grid>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Program </InputLabel>
                <Select
                  native
                  value={this.state.Eventdata.category_id}
                  onChange={this.texthandler}
                  inputProps={{
                    name: 'category_id',
                    id: 'category_id',
                  }}
                  width={400}
                >
                  <option aria-label="None" value="" />
                  <option name="1" value={10}>
                    Code academy
                  </option>
                  <option name="2" value={20}>
                    Freelancers
                  </option>
                  <option name="3" value={30}>
                    Start UP
                  </option>
                  <option name="4" value={40}>
                    Public
                  </option>
                </Select>
              </FormControl>
            </Grid>

            <Grid container>
              <Grid item>
                <TextField
                  id="event_location"
                  name="event_location"
                  onChange={this.texthandler}
                  placeholder="Location"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <TextField
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  onChange={this.texthandler}
                  placeholder="Description"
                />
              </Grid>
            </Grid>

            {/* <Grid container xs={12} spacing={1} alignItems="flex-end"> */}
            {/* <Grid container xs={6}>
                <Box mt={2}>
                  <Grid item>
                    <EventNoteIcon color="textSecondary" />
                  </Grid>
                  <Grid item>
                    <TextField id="event_date" name="event_date" placeholder="MM/DD/YYYY" onChange={this.texthandler} />
                  </Grid>
                </Box>
              </Grid> */}
            <Grid container xs={12} spacing={1} alignItems="flex-end">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item>
                  <KeyboardDatePicker
                    color="secondary"
                    margin="normal"
                    id="event_date"
                    name="event_date"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={this.state.Eventdata.event_date}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item>
                  <KeyboardTimePicker
                    color="secondary"
                    margin="normal"
                    id="event_time"
                    name="event_time"
                    label="Time picker"
                    value={this.state.Eventdata.event_time}
                    onChange={this.handleTimeChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            {/* </Grid> */}

            <Grid item>
              <Box classes={{ root: classes.root }} m={4}>
                <Button size="large" color="primary" variant="contained" type="submit">
                  ADD EVENT
                </Button>
              </Box>
            </Grid>
          </form>
          <Grid item>
            <Box classes={{ root: classes.root }} m={4}>
              <Button size="large" color="secondary" variant="contained" onClick={this.deletevalue}>
                CANCEL
              </Button>
            </Box>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(useStyles)(AddNewEvent);
