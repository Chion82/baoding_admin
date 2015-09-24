import React from 'react';
import { connect } from 'react-redux';
import NavList from '../utils/nav_list'
import AdminUserList from './admin_user_list';
import AdminUserCreator from './admin_user_creator';
import { fetch_admin_users, create_admin_user, change_admin_user_password, delete_admin_user } from './actions';

class AdminUserPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetch_admin_users());
  }
  handleCreateAdminUser(username, password) {
    this.props.dispatch(create_admin_user(username, password));
  }
  handleChangePassword(username, password) {
    this.props.dispatch(change_admin_user_password(username, password));
  }
  handleDeleteAdminUser(username) {
    this.props.dispatch(delete_admin_user(username));
  }
  render() {
    return (
      <div className="row">
        <div className="medium-3 columns">
          <NavList />
        </div>
        <div className="medium-9 columns">
          <h1>管理员管理</h1>
          <AdminUserCreator create_admin_user={this.handleCreateAdminUser.bind(this)} />
          <AdminUserList admin_user_list={this.props.admin_user_management.admin_user_list} handle_change_password={this.handleChangePassword.bind(this)} handle_delete_admin_user={this.handleDeleteAdminUser.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default connect((state)=>{return {admin_user_management : state.admin_user_management}})(AdminUserPage);
