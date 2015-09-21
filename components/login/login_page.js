import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5';

import './sass/style.scss';

class LoginPage extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let username = React.findDOMNode(this.refs.username).value;
    let password = md5(md5(React.findDOMNode(this.refs.password).value));
    $.post('/api/admin/login.do', {
      username,
      password
    }, (data)=>{
      switch(data.status) {
        case 200:
          alert('登录成功');
          break;
        default:
          alert('登录失败，请检查用户名或密码是否正确。');
          break;
      }
    });
  }
  render() {
    return (
      <div>
        <div className="LoginPage">
          <h1>管理后台</h1><br />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" name="user" placeholder="用户名" ref="username" />
            <input type="password" name="pass" placeholder="密码" ref="password"/>
            <button onClick={this.handleSubmit.bind(this)}>管理员登录</button>
          </form>
        </div>

      </div>
    );
  }
}

export default LoginPage;
