import React from 'react';
import NavList from '../utils/nav_list';

class AdminPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="medium-2 columns">
          <NavList />
        </div>
        <div className="medium-10 columns">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AdminPage;
