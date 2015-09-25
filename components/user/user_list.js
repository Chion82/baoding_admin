import React from 'react';
import md5 from 'md5';

class UserList extends React.Component {
  handleChangeUserStatus(username, new_status){
      this.props.on_change_user_status(username, new_status);
  }
  handleModifyUserDetails(username) {
    $.get('/api/admin/login_as_user.do?username=' + encodeURIComponent(username),
      (data)=>{
        if (data.status != 200) {
          return;
        }
        window.location.href='/user_center/details_info.html';
      });
  }
  handleChangeUserPassword(username) {
    $.post('/api/admin/change_user_password.do', {
      username : username,
      password : md5(md5(React.findDOMNode(this.refs['new_password_' + username]).value))
    }, (data)=>{
      if (data.status == 200) {
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    });
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>用户名</th>
            <th>状态</th>
            <th>用户类型</th>
            <th>企业名称</th>
            <th>联系人姓名</th>
            <th>联系方式</th>
            <th>邮箱</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          { this.props.user_list.map((user_info, index)=>{
            return (
              <tr>
                <td>
                  {user_info.username}
                </td>
                <td>
                  { user_info.status == 0 && '账号被禁用' }
                  { user_info.status == 1 && '审核中' }
                  { user_info.status == 2 && '审核不通过' }
                  { user_info.status == 3 && '正常' }
                </td>
                <td>
                  {user_info.user_type == 0 && '委单方'}
                  {user_info.user_type == 1 && '催收方'}
                </td>
                <td>
                  {user_info.business_name}
                </td>
                <td>
                  {user_info.contact_name}
                </td>
                <td>
                  {user_info.contact_phone}
                </td>
                <td>
                  {user_info.contact_email}
                </td>
                <td style={{width: '400px'}}>
                  <input type="text" placeholder="修改密码" ref={'new_password_' + user_info.username} />
                  <a href="javascript:void(0)" onClick={this.handleChangeUserPassword.bind(this, user_info.username)}>确认修改密码</a><br/>
                  <a href="javascript:void(0)" onClick={this.handleModifyUserDetails.bind(this, user_info.username)}>编辑详细信息</a><br/>
                  状态设为：<br/>
                  <a href="javascript:void(0)" onClick={this.handleChangeUserStatus.bind(this, user_info.username, 3)}>正常</a><br/>
                  <a href="javascript:void(0)" onClick={this.handleChangeUserStatus.bind(this, user_info.username, 1)}>审核中</a><br/>
                  <a href="javascript:void(0)" onClick={this.handleChangeUserStatus.bind(this, user_info.username, 2)}>审核不通过</a><br/>
                  <a href="javascript:void(0)" onClick={this.handleChangeUserStatus.bind(this, user_info.username, 0)}>禁用</a><br/>
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    );
  }
}

export default UserList;
