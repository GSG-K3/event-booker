import React, { Component } from 'react';
import { Grid, Box } from '@material-ui/core';

import Header from '../Common/Header/Header';

export default class Home extends Component {
  render() {
    const {
      showlogo,
      showMeun,
      showAvatar,
      isAvatarImage,
      srcImage,
      Name,
    } = this.props;
    return (
      <Grid direction="column" container>
        <Grid item xs={12}>
          <Header
            showlogo={showlogo}
            showMeun={showMeun}
            showAvatar={showAvatar}
            isAvatarImage={isAvatarImage}
            srcImage={srcImage}
            Name={Name}
          />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={3} />
          <Grid item container xs={12} sm={6}>
            <Box p={3}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Box>
          </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    );
  }
}
