import React from 'react';
import { Grid, AppBar } from '@material-ui/core';
import Logo from './Logo';
import BurgerMenu from './BurgerMenu';
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
      <Grid item xs={false} sm={2} />
      <Grid item xs={10} sm={8}>
        <UserAvatar
          showAvatar={showAvatar}
          isAvatarImage={isAvatarImage}
          srcImage={srcImage}
          Name={Name}
        />
        <Logo showlogo={showlogo} />
      </Grid>
      <Grid item xs={2} sm={1}>
        <BurgerMenu showMeun={showMeun} />
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

{
  /* showMeun={showMeun}
        showAvatar={showAvatar} */
}
