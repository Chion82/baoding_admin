import {REQUEST_ADMIN_USERS, RECEIVED_ADMIN_USERS} from './actions';

export function admin_user_management(state, action) {
  switch(action.type) {
    case REQUEST_ADMIN_USERS:
      return Object.assign({}, state, {
        is_fetching : true
      });
    case RECEIVED_ADMIN_USERS:
      return Object.assign({}, state, {
        is_fetching : false,
        admin_user_list : action.data.admin_user_list
      });
    default:
      return state || {
        is_fetching : false,
        admin_user_list : []
      }
  }
}
