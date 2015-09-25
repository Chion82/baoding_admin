import React from 'react';

class OrderSelector extends React.Component {
  handleSubmit() {
    this.props.handle_submit(React.findDOMNode(this.refs.keyword_input).value, React.findDOMNode(this.refs.status_input).value ,1);
  }
  render() {
    return (
      <div className="panel">
        <div className="row">
          <div className="small-3 columns">
            筛选委单：
          </div>
          <div className="small-3 columns">
            <select ref="status_input">
              <option value="-1">全部</option>
              <option value="0">被取消</option>
              <option value="1">审核中</option>
              <option value="2">审核不通过</option>
              <option value="3">电催进行中</option>
              <option value="4">已上线</option>
              <option value="5">竞标中</option>
              <option value="6">催收中</option>
              <option value="7">结算中</option>
              <option value="8">已结算</option>
            </select>
          </div>
          <div className="small-3 columns">
            <input type="text" ref="keyword_input" placeholder="委单编号/发布者用户名/接单者用户名/债务人名称" />
          </div>
          <div className="small-3 columns">
            <button className="button tiny" onClick={this.handleSubmit.bind(this)}>确定</button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSelector;
