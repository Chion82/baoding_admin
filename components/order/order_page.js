import React from 'react';
import { connect } from 'react-redux';
import { fetch_order_list } from './actions';
import NavList from '../utils/nav_list';
import OrderList from './order_list';
import OrderSelector from './order_selector';

class OrderPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetch_order_list('', '-1' , 1));
  }
  loadPage(keyword, status, page) {
    if (page < 1 || (page > this.props.order_management.total_page && this.props.order_management.total_page > 0)) {
      return;
    }
    this.props.dispatch(fetch_order_list(keyword, status , page));
  }
  updateOrderStatus(order_id, status) {
    $.post('/api/admin/change_order_status.do', {
      order_id,
      status
    }, (data)=>{
      this.props.dispatch(fetch_order_list(this.props.order_management.keyword, this.props.order_management.status, this.props.order_management.page));
    });
  }
  handleNewOrder() {
    $.get('/api/admin/login_as_user.do?username=admin', (data)=>{
      if (data.status != 200) {
        alert('模拟登录失败。请确认已注册admin用户。');
      }
      window.location.href=`/user_center/post_order.html`;
    });
  }
  render() {
    return (
      <div className="row">
        <div className="medium-3 columns">
          <NavList />
        </div>
        <div className="medium-9 columns">
          <h1>委单管理</h1>
          <a href="javascript:void(0)" onClick={this.handleNewOrder.bind(this)}>发布新委单</a>
          <OrderSelector handle_submit={this.loadPage.bind(this)} />
          <OrderList order_list={this.props.order_management.order_list} handle_update_order_status={this.updateOrderStatus.bind(this)} />
          <div>
            <a href="javascript:void(0)" onClick={this.loadPage.bind(this, this.props.order_management.keyword, this.props.order_management.status, this.props.order_management.page-1)}>上一页</a>
            {this.props.order_management.page} / {this.props.order_management.total_page}
            <a href="javascript:void(0)" onClick={this.loadPage.bind(this, this.props.order_management.keyword, this.props.order_management.status, this.props.order_management.page+1)}>下一页</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      order_management : state.order_management
    }
  }
)(OrderPage);
