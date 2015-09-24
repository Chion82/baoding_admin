import React from 'react';

class UserSelector extends React.Component {
  handleSubmit() {
    this.props.refresh(React.findDOMNode(this.refs.user_status_selector).value, React.findDOMNode(this.refs.user_keyword).value, 1);
  }
  render() {
    return (
      <div className="panel">
        <div className="row">
          <div className="small-3 columns">
            筛选用户：
          </div>
          <div className="small-3 columns">
            <select ref="user_status_selector">
              <option value="-1">全部</option>
              <option value="0">被禁用</option>
              <option value="1">审核中</option>
              <option value="2">审核不通过</option>
              <option value="3">正常</option>
            </select>
          </div>
          <div className="small-3 columns">
            <input type="text" ref="user_keyword" placeholder="用户名/公司名称" />
          </div>
          <div className="small-3 columns">
            <button onClick={this.handleSubmit.bind(this)} style={{display: 'inline'}}>确定</button>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSelector;
