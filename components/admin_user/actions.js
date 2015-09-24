import md5 from 'md5';

export const REQUEST_ADMIN_USERS = 'REQUEST_ADMIN_USERS';
export const RECEIVED_ADMIN_USERS = 'RECEIVED_ADMIN_USERS';

export function request_admin_users() {
  return {type:REQUEST_ADMIN_USERS};
}

export function received_admin_users(data) {
  return {
    type : RECEIVED_ADMIN_USERS,
    data
  };
}

export function fetch_admin_users() {
  return (dispatch, getState)=>{
    dispatch(request_admin_users());
    $.get('/api/admin/admin_users', (data)=>{
      dispatch(received_admin_users(data));
    });
  }
}

export function create_admin_user(username, password) {
  return (dispatch, getState)=>{
    $.post('/api/admin/create_admin_user.do', {
      username,
      password : md5(md5(password))
    }, (data)=>{
      dispatch(fetch_admin_users());
    });
  }
}

export function change_admin_user_password(username, password) {
  return (dispatch, getState)=>{
    $.post('/api/admin/change_password.do', {
      username,
      password : md5(md5(password))
    }, (data)=>{
      if (data.status == 200) {
        alert('修改密码成功！');
      }
      dispatch(fetch_admin_users());
    });
  }
}

export function delete_admin_user(username) {
  return (dispatch, getState)=>{
    $.get('/api/admin/delete_admin_user.do?username=' + encodeURIComponent(username), (data)=>{
      dispatch(fetch_admin_users());
    });
  }
}
