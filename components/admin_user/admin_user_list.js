import React from 'react';

class AdminUserList extends React.Component {
  change_password(username) {
    this.props.handle_change_password(username, React.findDOMNode(this.refs['new_password_' + username]).value);
  }
  delete_admin_user(username) {
    if (!window.confirm('确认删除管理员 ' + username + '?')) {
      return;
    }
    this.props.handle_delete_admin_user(username);
  }
  render() {
    return (
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>用户名</th>
            <th>修改密码</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.admin_user_list.map((user_info, index)=>{
            return (
              <tr>
                <td>{user_info.username}</td>
                <td>
                  <div className="row collapse">
                    <div className="small-8 columns"><input type="text" ref={'new_password_' + user_info.username}/></div>
                    <div className="small-4 columns"><button className="button postfix" onClick={this.change_password.bind(this, user_info.username)}>修改密码</button></div>
                  </div>
                </td>
                <td><button className="button alert tiny" onClick={this.delete_admin_user.bind(this, user_info.username)}>删除</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default AdminUserList;
