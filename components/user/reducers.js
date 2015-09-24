import {REQUEST_USERS, RECEIVED_USERS, CHANGE_USER_STATUS, USER_STATUS_CHANGED} from './actions';
import {combineReducers} from 'redux';

export function UserManagement (state, action) {
  switch(action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        is_fetching : true,
        user_list : [],
        keyword : action.keyword,
        page : action.page,
        user_status : action.user_status
      });
    case RECEIVED_USERS:
      if (action.data.status != 200) {
        alert('获取用户列表失败！');
        return Object.assign({}, state, {
            is_fetching : false
        });
      }
      return Object.assign({}, state, {
          is_fetching : false,
          user_list : action.data.user_list,
          total_pages : action.data.pages
      });
    case CHANGE_USER_STATUS:
      return state;
    case USER_STATUS_CHANGED:
      return state;
    default:
      return state || {
        is_fetching:false,
        user_list:[],
        keyword: '',
        page: 1
      };
  }
}
