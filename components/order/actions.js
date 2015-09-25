
export const REQUEST_ORDER_LIST = 'REQUEST_ORDER_LIST';
export const RECEIVED_ORDER_LIST = 'RECEIVED_ORDER_LIST';

export function request_order_list(keyword, status, page) {
  return {
    type : REQUEST_ORDER_LIST,
    keyword,
    page,
    status
  }
}

export function received_order_list(data) {
  return {
    type : RECEIVED_ORDER_LIST,
    data
  }
}

export function fetch_order_list(keyword, status, page) {
  return (dispatch, getState)=>{
    dispatch(request_order_list(keyword, status, page));
    $.get('/api/admin/order_list?keyword=' + encodeURIComponent(keyword) + `&status=${status}&page=${page}`, (data)=>{
      dispatch(received_order_list(data));
    });
  }
}
