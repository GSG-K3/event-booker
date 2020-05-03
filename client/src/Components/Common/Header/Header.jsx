import React from 'react';
import { Grid, AppBar } from '@material-ui/core';
import Logo from './Logo';
import UserAvatar from './UserAvatar';
export default ({
  showlogo,
  showMeun,
  showAvatar,
  isAvatarImage,
  srcImage,
  Name,
}) => {
  return (
    <Grid item container>
      <Grid item xs={false} md={2} />
      <Grid item xs={10} md={8}>
        <UserAvatar
          showAvatar={showAvatar}
          isAvatarImage={isAvatarImage}
          srcImage={srcImage}
          Name={Name}
        />
        <Logo showlogo={showlogo} />
      </Grid>
    </Grid>
  );
};
