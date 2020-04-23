import React, { Component } from 'react';
import Home from './../Home';
export default class UserLayout extends Component {
  render() {
    return (
      <div>
        <Home
          showlogo={true}
          showMeun={true}
          showAvatar={false}
          isAvatarImage={false}
          srcImage={null}
          Name="User"
        />
      </div>
    );
  }
}
