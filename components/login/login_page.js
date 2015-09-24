import React from 'react';
import {Link, History} from 'react-router';
import md5 from 'md5';
import './sass/style.scss';
import reactMixin from 'react-mixin';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
          this.history.pushState(null, '/user');
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
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="user" placeholder="用户名" ref="username" />
            <input type="password" name="pass" placeholder="密码" ref="password"/>
            <button onClick={this.handleSubmit}>管理员登录</button>
          </form>
        </div>

      </div>
    );
  }
}

reactMixin.onClass(LoginPage, History);

export default LoginPage;
