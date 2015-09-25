import {REQUEST_ORDER_LIST, RECEIVED_ORDER_LIST} from './actions';

export function order_management(state, action) {
  switch (action.type) {
    case REQUEST_ORDER_LIST:
      return Object.assign({}, state, {
        is_fetching : true,
        keyword : action.keyword,
        status : action.status,
        page : action.page
      });
    case RECEIVED_ORDER_LIST:
      return Object.assign({}, state, {
        is_fetching : false,
        order_list : action.data.order_list,
        total_page : action.data.pages
      });
    default:
      return state || {
        is_fetching : false,
        keyword : '',
        status : -1,
        page : 1,
        total_page : 0,
        order_list : []
    };
  }
}
