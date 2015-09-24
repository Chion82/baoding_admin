import fetch from 'isomorphic-fetch';

export const REQUEST_USERS = 'REQUEST_USERS';
let request_users = (user_status, keyword, page)=> {
  return {
    type : REQUEST_USERS,
    user_status,
    keyword,
    page
  }
}

export const RECEIVED_USERS = 'RECEIVED_USERS';
let received_users = (data)=>{
  return {
    type : RECEIVED_USERS,
    data
  }
}

export const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';
let change_user_status = (username, new_status)=>{
  return {
    type : CHANGE_USER_STATUS,
    username,
    new_status
  }
}

export const USER_STATUS_CHANGED = 'USER_STATUS_CHANGED';
let user_status_changed = ()=>{
  return {
    type : USER_STATUS_CHANGED
  }
}

export function fetch_user_list(user_status, keyword, page) {
  return (dispatch)=> {
    dispatch(request_users(user_status, keyword, page));
    $.get(`/api/admin/user_list?keyword=` + encodeURIComponent(keyword) + '&status=' + user_status + '&page=' + page,
      (data)=>{
        dispatch(received_users(data));
      });
  }
}

export function change_user_status(username, new_status) {
  return (dispatch, getState)=>{
    dispatch(change_user_status(username, new_status));
    $.get('/api/admin/change_user_status.do?username=' + encodeURIComponent(username) + '&status=' + new_status,
      (data)=>{
        dispatch(user_status_changed());
        let state = getState();
        dispatch(fetch_user_list(state.user_management.user_status, state.user_management.keyword, state.user_management.page));
      });
  }
}
