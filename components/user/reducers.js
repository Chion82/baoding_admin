import {REQUEST_USERS, RECEIVED_USERS} from './actions';
import {combineReducers} from 'redux';

export function user_reducer(state, action) {
  switch(action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        user: {
          is_fetching : true,
          user_list : [],
          keyword : action.keyword,
          page : action.page
        }
      });
    case RECEIVED_USERS:
      if (action.data.status != 200) {
        alert('获取用户列表失败！');
        return state;
      }
      return Object.assign({}, state, {
        user: {
          is_fetching : false,
          user_list : action.data.user_list,
          keyword : action.keyword,
          page : action.page
        }
      });
    default:
      return state || {
        user:{
          is_fetching:false,
          user_list:[],
          keyword: '',
          page: 1
        }
      };
  }
}
