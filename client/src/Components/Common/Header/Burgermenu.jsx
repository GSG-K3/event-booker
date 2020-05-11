import React from 'react';
import clsx from 'clsx';
import './icons.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Styles from './style';
class BurgerMenu extends React.Component {
  state = {
    right: false,
    userLogin: [
      { icon: 'fas fa-home', to: '/', text: 'Home' },
      {
        icon: 'fas fa-address-card',
        to: '/user/profile',
        text: 'Profile',
      },
      { icon: 'fas fa-sign-out-alt', to: '/', text: ' Logout' },
    ],
    userNotLogin: [
      { icon: 'fas fa-home', to: '/', text: 'Home' },
      { icon: 'fas fa-sign-in-alt', to: '/user/login', text: ' Login' },
      { icon: 'fas fa-child', to: '/user/SignUp', text: ' signUp' },
    ],

    UserAdmin: [
      { icon: 'fas fa-home', to: '/admin/', text: 'Home' },
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
        menu: this.state.UserAdmin,
      });
    } else if (isLogin === true) {
      this.setState({ menu: this.state.userLogin });
    } else {
      this.setState({ menu: this.state.userNotLogin });
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
