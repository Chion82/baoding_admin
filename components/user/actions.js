import fetch from 'isomorphic-fetch';

export const REQUEST_USERS = 'REQUEST_USERS';
let request_users = (keyword, page)=> {
  return {
    type : REQUEST_USERS,
    keyword,
    page
  }
}

export const RECEIVED_USERS = 'RECEIVED_USERS';
let received_users = (keyword, page, data)=>{
  return {
    type : RECEIVED_USERS,
    data,
    keyword,
    page
  }
}

export function fetch_user_list(keyword, page) {

  return (dispatch)=> {
    dispatch(request_users(keyword, page));
    $.get(`/api/admin/user_list?keyword=` + encodeURIComponent(keyword) + '&page=' + page,
      (data)=>{
        dispatch(received_users(keyword, page, data));
      });
  }
}
