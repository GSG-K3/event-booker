import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './style';

class BurgerMenu extends Component {
  render() {
    const { classes } = this.props;
    return (
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        color="secondary"
      >
        <MenuIcon classes={{ root: classes.root }} />
      </IconButton>
    );
  }
}

export default withStyles(useStyles)(BurgerMenu);
