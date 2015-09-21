import React from 'react';
import {Link} from 'react-router';


class NavList extends React.Component {
  render() {
    return (
      <ul className="side-nav">
        <li><Link to="/user">用户管理</a></li>
        <li><Link href="/order">委单管理</a></li>
      </ul>
    );
  }
}

export default NavList;
