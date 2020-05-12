import React, { Component } from 'react';
import { Grid, Box, Typography, Button, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  QueryBuilder as QueryBuilderIcon,
  Room as RoomIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import LoaderProgress from '../../Common/LoaderProgress';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  red: {
    color: red[500],
  },
  btnCancel: {
    borderRadius: 15,
    width: 230,
    height: 33,
    background: '#FBF3F1',
    border: '1px solid #F6554D',
    fontWeight: 900,
    fontSize: 16,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#F6554D',
  },
});

class AdminEventDetails extends Component {
  state = {
    eventdetail: [],
    isEnrolled: false,
    userCode: null,
    redirect: false,
    isLoading: true,
    displayBlock: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/admin/event/${id}`)
      .then((res) => {
        const resdata = res.data.data[0];

        this.setState({ eventdetail: resdata });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.messag);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Box component="div">
        {/* <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={6}> */}
        {/* <Paper elevation={3}> */}
        <Box p={6}>
          <Grid item xs={12}>
            <Typography variant="h6" justify="center">
              Event Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{this.state.eventdetail.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" className={classes.red}>
              Hosted by: {this.state.eventdetail.host}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box my={3}>
              <Typography variant="body1" align="justify">
                {this.state.eventdetail.description}
              </Typography>
            </Box>
          </Grid>

          <Grid container spacing={1} justify="space-around">
            <Grid item xs={6}>
              <Grid item>
                <EventNoteIcon />
              </Grid>
              <Grid item>
                <Typography variant="h7">
                  {this.state.eventdetail.event_date}
                </Typography>
              </Grid>
            </Grid>

            <Grid itemxs={6}>
              <Grid item>
                <RoomIcon />
              </Grid>
              <Grid item>
                <Typography variant="h7">
                  {this.state.eventdetail.event_location}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* </Paper> */}
        {/* </Box> */}
      </Box>
    );
  }
}
export default withStyles(useStyles)(AdminEventDetails);
