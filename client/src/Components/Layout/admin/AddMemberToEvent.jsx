import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoaderProgress from '../../Common/LoaderProgress';

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormHelperText,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  NativeSelect,
} from '@material-ui/core';

import { KeyboardBackspace, DeleteSweep, Save } from '@material-ui/icons';

import { deepOrange } from '@material-ui/core/colors';

import swal from 'sweetalert';

const useStyle = makeStyles((theme) => ({
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
}));

export default (props) => {
  const classes = useStyle();

  const [formData, setFormData] = useState({
    memberId: {
      value: 0,
      message: '',
      isValid: true,
      isRequired: true,
      type: 'select',
      name: 'memberId',
      lable: 'Member',
    },
    eventId: {
      value: 0,
      message: '',
      isValid: true,
      isRequired: true,
      type: 'select',
      name: 'eventId',
      lable: 'Event',
    },
  });

  const [isLoading, SetIsLoading] = useState(true);
  const [displayBlock, SetDisplayBlock] = useState(false);

  const [memeberData, setMemberData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

  const getEvent = () => axios.get('/api/admin/getEventsDay');

  const getMember = () => axios.get('/api/admin/user/getAllMember');

  useEffect(() => {
    axios
      .all([getEvent(), getMember()])
      .then(
        axios.spread((event, member) => {
          const eventData = event.data.data.map((e, index) => {
            return (
              <option name="event_id" value={e.gid} key={index}>
                {e.title}
              </option>
            );
          });

          const memberData = member.data.data.map((e, index) => {
            return (
              <option name="member_id" value={e.gid} key={index}>
                {e.user_name}
              </option>
            );
          });
          setMemberData(memberData);
          setEventData(eventData);
          SetIsLoading(false);
        }),
      )
      .catch();
  }, []);

  const handleBack = (e) => {
    props.history.goBack();
  };

  const handleClearValues = (e) => {
    const inputs = { ...formData };
    for (let control of Object.keys(inputs)) {
      inputs[control].message = '';
      inputs[control].isValid = true;
      inputs[control].value = 0;
    }
    setFormData(inputs);
  };

  const handleTextInput = (e) => {
    const inputs = { ...formData };
    inputs[e.target.name].value = e.target.value;
    setFormData(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetDisplayBlock(true);
    SetIsLoading(true);
    let formValid = true;
    const inputs = { ...formData };
    const data = {};
    for (let control of Object.keys(inputs)) {
      let input = inputs[control];
      if (input.isRequired && input.type === 'select') {
        if (!input.value) {
          inputs[control].message = `Please Select ${input.lable}`;
          inputs[control].isValid = false;
          formValid = false;
        } else {
          inputs[control].message = '';
          inputs[control].isValid = true;
          data[inputs[control].name] = inputs[control].value;
        }
      }
    }

    if (!formValid) {
      setFormData(inputs);
      SetIsLoading(false);
      return;
    }
    axios
      .post('/api/admin/Event/add-Member-to-event', { data })
      .then((result) => {
        if (result.data.status !== 200) {
          SetIsLoading(false);
          swal('Error', result.data.messag, 'error');
          return;
        }
        handleClearValues();
        SetIsLoading(false);
        swal('Good job!', result.data.messag, 'success');
      })
      .catch((err) => {
        console.log('Error : ', err);
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        SetIsLoading(false);
      });
  };

  const { memberId, eventId } = formData;
  return (
    <Box mt={4} component="div" p={3} width={1}>
      <LoaderProgress isLoading={isLoading} />
      <Box component="div" display={displayStatus} width={1}>
        <Grid container justify="center">
          <Paper elevation={3} className={classes.content}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary">
                Add Member To Event
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid xs={12}>
                  <FormControl className={classes.fullWidth}>
                    <InputLabel htmlFor="member_id" color="secondary">
                      {memberId.lable}
                    </InputLabel>
                    <NativeSelect
                      color="secondary"
                      value={memberId.value}
                      error={!memberId.isValid}
                      onChange={handleTextInput}
                      inputProps={{
                        name: memberId.name,
                        id: 'member_id',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {memeberData}
                    </NativeSelect>
                  </FormControl>
                  <Grid item className={classes.errorTitle}>
                    <FormControl error className={classes.errorTitle}>
                      <FormHelperText className={classes.textError}>
                        {memberId.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid xs={12}>
                  <FormControl className={classes.fullWidth}>
                    <InputLabel htmlFor={eventId.name} color="secondary">
                      {eventId.lable}
                    </InputLabel>
                    <NativeSelect
                      color="secondary"
                      value={eventId.value}
                      error={!eventId.isValid}
                      onChange={handleTextInput}
                      inputProps={{
                        name: eventId.name,
                        id: eventId.name,
                      }}
                    >
                      <option aria-label="None" value="" />
                      {eventData}
                    </NativeSelect>
                  </FormControl>
                  <Grid item className={classes.errorTitle}>
                    <FormControl error className={classes.errorTitle}>
                      <FormHelperText className={classes.textError}>
                        {eventId.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
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
                        onClick={handleClearValues}
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
                  onClick={handleBack}
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
};
