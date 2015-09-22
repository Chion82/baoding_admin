import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import NavList from '../utils/nav_list'
import {fetch_user_list} from './actions';

class UserPage extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetch_user_list('', 1));
    }
    render () {
      return (
        <div className="row">
          <div className="medium-3 columns">
            <NavList />
          </div>
          <div className="medium-9 columns">
            <h1>用户管理</h1>
            { this.props.user && this.props.user.user_list.map((user_info, key) => {
                return (<h1>{user_info.business_name}</h1>);
              }) }
          </div>
        </div>
      );
    }
}


let select = (state) => {
  let user = state.user_reducer.user;
  return {
    user
  }
}

export default connect(select)(UserPage);
