import React, { Component } from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import {
  QueryBuilder as QueryBuilderIcon,
  Room as RoomIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import '../../Theme/Css/App.css';
import axios from 'axios';

const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  red: {
    color: red[500],
  },
});

class EventDetails extends Component {
  state = {
    eventdetail: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params.id);
    axios.get(`/api/event/${id}`).then((res) => {
      const eventdetail = res.data.data;
      console.log(eventdetail);
      this.setState({ eventdetail: res.data.data[0] });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box p={3}>
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

        <Grid container spacing={1}>
          <Grid item>
            <EventNoteIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">
              {this.state.eventdetail.event_date}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <QueryBuilderIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">
              {this.state.eventdetail.event_time}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <RoomIcon />
          </Grid>
          <Grid item>
            <Typography variant="h7">
              {this.state.eventdetail.event_location}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Box classes={{ root: classes.root }} m={4}>
            <Button size="small" color="primary" variant="contained">
              Take a place
            </Button>
          </Box>
        </Grid>
      </Box>
    );
  }
}
export default withStyles(useStyles)(EventDetails);
