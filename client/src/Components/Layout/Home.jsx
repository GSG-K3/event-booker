import React, { Component } from 'react';
import { Box, Grid } from '@material-ui/core';

import EventContainer from '../Common/Event/EventContainer';

export default class Home extends Component {
  render() {
    return (
      <Box p={3}>
        <Grid container item justify="center">
          <EventContainer />
        </Grid>
      </Box>
    );
  }
}
