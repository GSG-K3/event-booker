import React from 'react';
import clsx from 'clsx';
import './icons.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

export default class BurgerMenu extends React.Component {
  state = {
    right: false,
    userLogin: [
      {
        icon: 'fas fa-address-card',
        to: '/user/profile',
        text: 'Profile',
      },
      { icon: 'far fa-calendar-alt', to: '/', text: ' Events' },

      { icon: 'fas fa-sign-out-alt', to: '/', text: ' Logout' },
    ],
    userNotLogin: [
      { icon: 'fas fa-sign-in-alt', to: '/user/login', text: ' Login' },
      { icon: 'fas fa-sign-in-alt', to: '/user/SignUp', text: ' signUp' },
    ],

    UserAdmin: [
      {
        icon: 'far fa-calendar-plus',
        to: '/admin/Event/NewEvent',
        text: ' New event',
      },
      {
        icon: 'fas fa-user-plus',
        to: '/admin/user/NewMember',
        text: 'New member',
      },
      { icon: 'fas fa-sign-out-alt', to: '/', text: ' Logout' },
    ],
    drawer: [],
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
    if (this.state.isAdmin == true) {
      this.setState({ menu: this.state.UserAdmin });
    } else if (this.state.isAuth === true) {
      this.setState({ menu: this.state.userLogin });
    } else {
      this.setState({ menu: this.state.userNotLogin });
    }
  }

  list = (anchor) => (
    <div
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {this.state.menu.map((e) => (
          <ListItem button={true}>
            <ListItemIcon>
              <Icon className={e.icon} color="primary" />
            </ListItemIcon>
            <Link to={e.to}>
              <ListItemText primary={e.text} />
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <ListItemIcon>
            <Icon className="fas fa-envelope" color="primary" />
          </ListItemIcon>
          <a href="mailto:someone@example.com" target="_top">
            Contact us
          </a>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <React.Fragment>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.toggleDrawer('right', true)}
            // className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'right'}
            open={this.state['right']}
            onClose={this.toggleDrawer('right', false)}
          >
            {this.list('right')}
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
