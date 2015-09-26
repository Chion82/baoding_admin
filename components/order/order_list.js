import React from 'react';

class OrderList extends React.Component {
  handleModify(order_id) {
    $.get('/api/admin/login_as_user.do?username=admin', (data)=>{
      if (data.status != 200) {
        alert('模拟登录失败。请确认已注册admin用户。');
      }
      window.location.href=`/user_center/edit_order.html?order_id=${order_id}`;
    });
  }
  handleViewProgress(order_id) {
    $.get('/api/admin/login_as_user.do?username=admin', (data)=>{
      if (data.status != 200) {
        alert('模拟登录失败。请确认已注册admin用户。');
      }
      window.location.href=`/user_center/order_progress.html?order_id=${order_id}`;
    });
  }
  handleUpdateOrderStatus(order_id) {
    this.props.handle_update_order_status(order_id,
      React.findDOMNode(this.refs['status_input_' + order_id]).value
    );
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>委单编号</th>
            <th>状态</th>
            <th>债务人类型</th>
            <th>债务人名称</th>
            <th>发布者</th>
            <th>接单人</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.order_list.map((order_info, index)=>{
            return (
              <tr>
                <td>{order_info.order_id}</td>
                <td>
                  {order_info.status==0 && '被取消'}
                  {order_info.status==1 && '审核中'}
                  {order_info.status==2 && '审核不通过'}
                  {order_info.status==3 && '电催进行中'}
                  {order_info.status==4 && '已上线'}
                  {order_info.status==5 && '竞标中'}
                  {order_info.status==6 && '催收中'}
                  {order_info.status==7 && '结算中'}
                  {order_info.status==8 && '已结算'}
                </td>
                <td>
                  {order_info.debtor_type==0 && '个人'}
                  {order_info.debtor_type==1 && '企业'}
                </td>
                <td>{order_info.debtor_name}</td>
                <td>{order_info.post_user}</td>
                <td>{order_info.accept_user}</td>
                <td>
                  <a href="javascript:void(0)" onClick={this.handleModify.bind(this, order_info.order_id)}>编辑委单详情</a>
                  <br />
                  <a href="javascript:void(0)" onClick={this.handleViewProgress.bind(this, order_info.order_id)}>查看进度</a>
                  <br />修改状态：
                  <select ref={'status_input_' + order_info.order_id}>
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
                  <a href="javascript:void(0)" onClick={this.handleUpdateOrderStatus.bind(this, order_info.order_id)}>确认修改</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default OrderList;
