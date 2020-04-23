import React, { Component } from 'react';

import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';

export default class BaseLayout extends Component {
  state = { isAdmin: false };

  render() {
    const { isAdmin } = this.state;
    return isAdmin ? <AdminLayout /> : <UserLayout />;
  }
}
