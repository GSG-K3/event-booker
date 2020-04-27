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
    const id = 'e44c360c-b9a3-4c07-b2c6-5d0ed52943fb';
    //`http://localhost:4000/api/event/${id}`
    console.log(id);
    axios.get(`/api/event/${id}`).then((res) => {
      //console.log(res);
      const eventdetail = res.data;
      console.log(eventdetail);
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
          <Box classes={{ root: classes.root }}>
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

// eventdetail: {
//   title: 'coding for everyone',
//   description:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, ',
//   event_date: '23/5',
//   event_time: '5:00',
//   event_location: 'home',
//   host: 'ruba',
// },
