import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import { Person as PersonIcon, Lock as LockIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import {
  QueryBuilder as QueryBuilderIcon,
  Room as RoomIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
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
    category: [],
    // selectedDate: new Date('2014-08-18T21:11:54'),
  };
  deletevalue = () => {
    this.setState({
      Eventdata: {
        title: '',
        host: '',
        category_id: 0,
        event_location: '',
        description: '',
        event_date: new Date(),
        event_time: new Date(),
      },
    });
  };

  componentDidMount() {
    axios
      .get('/api/admin/getcategory')
      .then((res) => {
        const resdata = res.data.data;
        const category = resdata.map((e, index) => {
          return (
            <option name="category_id" value={e.id} key={index}>
              {e.catg_name}
            </option>
          );
        });
        this.setState({ category: category });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.messag);
      });
  }

  handleDateChange = (event, date) => {
    const form = this.state.Eventdata;
    form.event_date = date;
    this.setState({ Eventdata: form });
  };
  handleTimeChange = (event, date) => {
    const form = this.state.Eventdata;
    form.event_time = new Date('0 ' + date);
    this.setState({ Eventdata: form });
  };
  texthandler = (e) => {
    const form = this.state.Eventdata;
    form[e.target.name] = e.target.value;
    this.setState({ Eventdata: form });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`/api/admin/event/addEvent`, this.state.Eventdata)
      .then((res) => {
        if (res.data.status !== 200) {
          alert(res.data.messg);
          return;
        }
        alert('event added succesfully');
        this.setState({
          Eventdata: {
            title: '',
            host: '',
            category_id: 0,
            event_location: '',
            description: '',
            event_date: new Date(),
            event_time: new Date(),
          },
        });
      })
      .catch((error) => {
        alert(err.response.data.messag);
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    const data = this.state.Eventdata;
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
              <Grid item xs={12}>
                <TextField
                  value={data.title}
                  id="title"
                  name="title"
                  onChange={this.texthandler}
                  placeholder="Event Name"
                  fullWidth
                  // labelWidth={260}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  value={data.host}
                  fullWidth
                  id="host"
                  name="host"
                  onChange={this.texthandler}
                  placeholder="Host"
                />
              </Grid>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Program </InputLabel>
                <Select
                  labelWidth={276}
                  native
                  value={this.state.Eventdata.category_id}
                  onChange={this.texthandler}
                  inputProps={{
                    name: 'category_id',
                    id: 'category_id',
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.state.category}
                </Select>
              </FormControl>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <TextField
                  value={data.event_location}
                  id="event_location"
                  name="event_location"
                  onChange={this.texthandler}
                  placeholder="Location"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  value={data.description}
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  onChange={this.texthandler}
                  placeholder="Description"
                  fullWidth
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
                <Grid item xs={12}>
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
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  ADD EVENT
                </Button>
              </Box>
            </Grid>
          </form>
          <Grid item>
            <Box classes={{ root: classes.root }} m={4}>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                onClick={this.deletevalue}
              >
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
