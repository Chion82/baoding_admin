import React from 'react';
import { Router, Route, Link } from 'react-router';
import AdminPage from './admin_page/admin_page';
import LoginPage from './login/login_page';
import HelloPage from './hello/hello_page';
import UserPage from './user/user_page';
import OrderPage from './order/order_page';
import AdminUserPage from './admin_user/admin_user_page';
import { user_management } from './user/reducers';
import { admin_user_management } from './admin_user/reducers';
import { order_management } from './order/reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const root_reducer = combineReducers({
  user_management,
  admin_user_management,
  order_management
});

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(root_reducer);

class App extends React.Component {
  render (){
    return (
      <Provider store={store}>
        {() =>
          <Router>
            <Route path="/" component={LoginPage} />
            <Route path="/admin_center" component={AdminPage} >
              <Route path="user" component={UserPage} />
              <Route path="admin_user" component={AdminUserPage} />
              <Route path="order" component={OrderPage} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}

export default App;
