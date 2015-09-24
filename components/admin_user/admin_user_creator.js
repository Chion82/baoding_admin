import React from 'react';

class AdminUserCreator extends React.Component {
  handleSubmit() {
    this.props.create_admin_user(React.findDOMNode(this.refs.new_username).value, React.findDOMNode(this.refs.new_password).value);
  }
  render() {
    return (
      <div className="panel">
        <div className="row">
          <div className="small-4 columns">
            <input type="text" ref="new_username" placeholder="用户名" />
          </div>
          <div className="small-4 columns">
            <input type="text" ref="new_password" placeholder="密码" />
          </div>
          <div className="small-4 columns">
            <button className="button tiny" onClick={this.handleSubmit.bind(this)}>添加管理员</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUserCreator;
