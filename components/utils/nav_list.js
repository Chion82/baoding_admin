import React from 'react';
import {Link} from 'react-router';


class NavList extends React.Component {
  render() {
    return (
      <ul className="side-nav">
        <li><Link to="/user">用户管理</Link></li>
        <li><Link to="/order">委单管理</Link></li>
      </ul>
    );
  }
}

export default NavList;
