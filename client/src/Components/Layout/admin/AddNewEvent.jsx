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
  NativeSelect,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { deepOrange } from '@material-ui/core/colors';
import { Save, DeleteSweep, KeyboardBackspace } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import axios from 'axios';
import LoaderProgress from '../../Common/LoaderProgress';
import swal from 'sweetalert';
const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  deepOrange: {
    color: deepOrange[400],
  },
  right: { 'text-align': 'right' },
  content: {
    padding: '33px',
    width: '100%',
    minWidth: 290,
    maxWidth: 390,
  },
  fullWidth: { width: '100%' },
});

class AddNewEvent extends Component {
  state = {
    eventData: {
      title: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
        type: 'text',
        lable: 'Event Name',
      },
      host: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
        type: 'text',
        lable: 'Host',
      },
      category_id: {
        value: 0,
        message: '',
        isValid: true,
        isRequired: true,
        type: 'select',
        lable: 'Program',
      },
      event_location: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
        type: 'text',
        lable: 'Location',
      },
      description: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
        type: 'text',
        lable: 'Description',
      },
      event_date: {
        value: new Date().setDate(new Date().getDate() + 1),
        type: 'date',
      },
      event_time: { value: new Date(), type: 'time' },
    },
    category: [],
    // selectedDate: new Date('2014-08-18T21:11:54'),
    isLoading: true,
    displayBlock: false,
  };

  handleClearValues = () => {
    this.clearDataField();
  };

  handleBack = () => {
    // to return the user from where he comes
    this.props.history.goBack();
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
        this.setState({ category: category, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
      });
  }

  handleDateChange = (event, date) => {
    const form = this.state.eventData;
    form.event_date.value = date;
    this.setState({ eventData: form });
  };
  handleTimeChange = (event, date) => {
    const form = this.state.eventData;
    form.event_time.value = new Date('0 ' + date);
    this.setState({ eventData: form });
  };

  handleTextInput = (e) => {
    const target = e.target;
    const form = this.state.eventData;
    form[target.name].value = target.value;
    this.setState({ eventData: form });
  };

  clearDataField() {
    const { eventData } = this.state;
    const fromInput = {};

    for (let control of Object.keys(eventData)) {
      let input = eventData[control];
      input.value = '';
      input.message = '';
      input.isValid = true;
      fromInput[control] = input;
    }

    fromInput.event_date.value = new Date().setDate(new Date().getDate() + 1);
    fromInput.event_time.value = new Date();

    this.setState({
      eventData: fromInput,
      isLoading: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let formValid = true;
    const { eventData } = this.state;

    const fromInput = {};

    for (let control of Object.keys(eventData)) {
      let input = eventData[control];

      if (input.isRequired && input.type === 'text') {
        if (!input.value.trim()) {
          input.message = `Please Enter ${input.lable}`;
          input.isValid = false;
          formValid = false;
        } else {
          input.message = '';
          input.isValid = true;
        }
      }

      if (input.isRequired && input.type === 'select') {
        if (input.value === 0) {
          input.message = `Please Select ${input.lable}`;
          input.isValid = false;
          formValid = false;
        } else {
          input.message = '';
          input.isValid = true;
        }
      }

      fromInput[control] = input;
    }

    if (!formValid) {
      this.setState({ eventData: fromInput });
      return;
    }

    this.setState({
      eventData: fromInput,
      isLoading: true,
      displayBlock: true,
    });

    //return;

    const data = {
      title: eventData.title.value,
      host: eventData.host.value,
      category_id: eventData.category_id.value,
      event_location: eventData.event_location.value,
      event_date: eventData.event_date.value,
      event_time: eventData.event_time.value,
      description: eventData.description.value,
    };

    axios
      .post(`/api/admin/event/addEvent`, data)
      .then((res) => {
        if (res.data.status !== 200) {
          swal(res.data.messg);
          return;
        }
        swal('Good job!', "'event added succesfully", 'success');

        this.clearDataField();
      })
      .catch((error) => {
        if (error.response.data) swal(error.response.data.messag);
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { isLoading, displayBlock } = this.state;

    const {
      title,
      host,
      category_id,
      event_location,
      event_date,
      event_time,
      description,
    } = this.state.eventData;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
    return (
      <Box mt={4} component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Paper elevation={3} className={classes.content}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Add New Event
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <form
                  onSubmit={this.handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        required
                        value={title.value}
                        error={!title.isValid}
                        autoFocus={true}
                        id="title"
                        name="title"
                        onChange={this.handleTextInput}
                        placeholder="Event Name"
                        fullWidth={true}
                        label="Event Name"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {title.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        value={host.value}
                        error={!host.isValid}
                        id="host"
                        name="host"
                        onChange={this.handleTextInput}
                        placeholder="Host"
                        label="Host"
                        fullWidth={true}
                        color="secondary"
                        required
                      />
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {host.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl className={classes.fullWidth}>
                      <InputLabel htmlFor="event-category" color="secondary">
                        Program
                      </InputLabel>
                      <NativeSelect
                        color="secondary"
                        value={category_id.value}
                        error={!category_id.isValid}
                        onChange={this.handleTextInput}
                        inputProps={{
                          name: 'category_id',
                          id: 'event-category',
                        }}
                      >
                        <option aria-label="None" value="" />
                        {this.state.category}
                      </NativeSelect>
                    </FormControl>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {category_id.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        value={event_location.value}
                        error={!event_location.isValid}
                        id="event_location"
                        name="event_location"
                        onChange={this.handleTextInput}
                        placeholder="Location"
                        label="Location"
                        fullWidth={true}
                        color="secondary"
                        required
                      />
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {event_location.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        value={description.value}
                        error={!description.isValid}
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        onChange={this.handleTextInput}
                        placeholder="Description"
                        fullWidth={true}
                        required
                        color="secondary"
                      />
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {description.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} spacing={1} alignItems="flex-end">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={12}>
                        <KeyboardDatePicker
                          clearable
                          color="secondary"
                          margin="normal"
                          id="event_date"
                          name="event_date"
                          label="Event Date"
                          format="MM/dd/yyyy"
                          minDate={new Date()}
                          animateYearScrolling={true}
                          value={event_date.value}
                          onChange={this.handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          className={classes.fullWidth}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <KeyboardTimePicker
                          clearable
                          color="secondary"
                          margin="normal"
                          id="event_time"
                          name="event_time"
                          label="Event Time"
                          value={event_time.value}
                          onChange={this.handleTimeChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                          className={classes.fullWidth}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid container>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                      <Box classes={{ root: classes.root }} m={4}>
                        <Button
                          size="medium"
                          color="primary"
                          variant="contained"
                          onClick={this.handleClearValues}
                          startIcon={<DeleteSweep />}
                        >
                          Clear
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              <Grid item>
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={this.handleBack}
                    startIcon={<KeyboardBackspace />}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(useStyles)(AddNewEvent);
