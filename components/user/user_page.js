import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import NavList from '../utils/nav_list'
import {fetch_user_list, change_user_status} from './actions';
import UserList from './user_list';
import UserSelector from './user_selector';

class UserPage extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetch_user_list('-1','', 1));
    }
    load_page(user_status, keyword, page) {
      if ( page<1 || (page>this.props.UserManagement.total_pages && this.props.UserManagement.total_pages > 0)) {
        return;
      }
      this.props.dispatch(fetch_user_list(user_status,keyword, page));
    }
    on_change_user_status(username, new_status) {
      this.props.dispatch(change_user_status(username, new_status));
    }
    render () {
      return (
        <div className="row">
          <div className="medium-3 columns">
            <NavList />
          </div>
          <div className="medium-9 columns">
            <h1>用户管理</h1>
            <UserSelector refresh={this.load_page.bind(this)} />
            <UserList user_list={this.props.UserManagement.user_list} on_change_user_status={this.on_change_user_status.bind(this)}/>
            <div>
              <a href="javascript:void(0)" onClick={this.load_page.bind(this, this.props.UserManagement.user_status, this.props.UserManagement.keyword, this.props.UserManagement.page-1)} >上一页</a>
              {this.props.UserManagement.page} / {this.props.UserManagement.total_pages}
              <a href="javascript:void(0)" onClick={this.load_page.bind(this, this.props.UserManagement.user_status, this.props.UserManagement.keyword, this.props.UserManagement.page+1)} >下一页</a>
            </div>
          </div>
        </div>
      );
    }
}


let select = (state) => {
  return {
    UserManagement: state.UserManagement
  }
}

export default connect(select)(UserPage);
