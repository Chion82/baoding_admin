import React from 'react';
import { Router, Route, Link } from 'react-router';
import LoginPage from './login/login_page';
import HelloPage from './hello/hello_page';

class App extends React.Component {
  render (){
    return (
      <Router>
        <Route path="/" component={LoginPage} />
        <Route path="/hello" component={HelloPage} />
      </Router>
    );
  }
}

export default App;
