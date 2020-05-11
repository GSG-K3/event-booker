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
import MenuIcon from '@material-ui/icons/Menu';

import Styles from './style';
class BurgerMenu extends React.Component {
  state = {
    right: false,
    isAuth: false,
    isAdmin: false,
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

  // componentDidMount() {
  //   console.log('componentDidMount Menu', this.props);
  //   const { isLogin, isAdmin } = this.props;

  //   console.log('isLogin', isLogin, 'isAdmin', isAdmin);

  //   if (isAdmin === true) {
  //     this.setState({
  //       isAuth: isLogin,
  //       isAdmin: isAdmin,
  //       menu: adminMenuItems(),
  //     });
  //   } else if (isLogin === true) {
  //     console.log('isLogin', isLogin);
  //     this.setState({ menu: userMenuItems() });
  //   } else {
  //     this.setState({ menu: anonymousMenuItems() });
  //   }
  // }

  list = (anchor, classes, menu) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {menu.map((e, index) => (
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
    const { classes, menu } = this.props;
    console.log('this.props : ', this.props);
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
          {this.list('right', classes, menu)}
        </Drawer>
      </React.Fragment>
    );
  }
}
export default withStyles(Styles)(BurgerMenu);
