import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuth from '../../../helpers/isAuth';

export default (AuthComponent, role) => {
  return class AuthRouter extends Component {
    state = {
      isAuthenticated: false,
      isLoading: true,
    };
    componentDidMount() {
      isAuth(role)
        .then((result) => {
          this.setState({ isLoading: false, isAuthenticated: true });
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            alert(err.response.data.messag);
          }

          this.setState({ isLoading: false, isAuthenticated: false });
        });
    }

    render() {
      const { isAuthenticated, isLoading } = this.state;
      if (isLoading) {
        return null;
      }
      if (!isAuthenticated) {
        return <Redirect to={`/user/login`} />;
      }
      return <AuthComponent {...this.props} />;
    }
  };
};
