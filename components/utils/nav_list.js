import React from 'react';
import {Link ,History} from 'react-router';
import reactMixin from 'react-mixin';


class NavList extends React.Component {
  logout() {
    $.get('/api/admin/logout.do', (data)=>{
      this.history.pushState(null, '/');
    });
  }
  render() {
    return (
      <ul className="side-nav">
        <li><Link to="/admin_center/user">用户管理</Link></li>
        <li><Link to="/admin_center/order">委单管理</Link></li>
        <li><Link to="/admin_center/admin_user">管理员管理</Link></li>
        <li><a href="javascript:void(0)" onClick={this.logout.bind(this)}>退出登录</a></li>
      </ul>
    );
  }
}

reactMixin.onClass(NavList, History);

export default NavList;
