import React from 'react';
import clsx from 'clsx';
import './icons.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Icon,
} from '@material-ui/core';

import {
  userMenuItems,
  anonymousMenuItems,
  adminMenuItems,
} from './Burgermenu.config';

import Styles from './style';

class BurgerMenu extends React.Component {
  state = {
    right: false,
    isAuth: false,
    isAdmin: false,
    menu: [],
  };

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  componentDidMount() {
    console.log();
    const { isLogin, isAdmin } = this.props;

    if (isAdmin == true) {
      this.setState({
        isAuth: isLogin,
        isAdmin: isAdmin,
        menu: adminMenuItems,
      });
    } else if (isLogin === true) {
      this.setState({ menu: userMenuItems });
    } else {
      this.setState({ menu: anonymousMenuItems });
    }
  }

  list = (anchor, classes) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {this.state.menu.map((e, index) => (
          <div>
            <ListItem key={index} button={true}>
              <ListItemIcon className={classes.iconStyle}>
                <Icon
                  className={clsx(e.icon, classes.iconStyle)}
                  color="secondary"
                />
              </ListItemIcon>
              <Link className={classes.link} to={e.to}>
                <ListItemText primary={e.text} />
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color="secondary"
          aria-label="menu"
          edge="end"
          onClick={this.toggleDrawer('right', true)}
        >
          <MenuIcon classes={{ root: classes.root }} />
        </IconButton>
        <Drawer
          anchor={'right'}
          open={this.state['right']}
          onClose={this.toggleDrawer('right', false)}
        >
          {this.list('right', classes)}
        </Drawer>
      </React.Fragment>
    );
  }
}
export default withStyles(Styles)(BurgerMenu);
