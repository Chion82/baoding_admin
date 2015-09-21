import React from 'react';
import {Link} from 'react-router';

class HelloPage extends React.Component {
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <Link to="/">index</Link>
      </div>
    );
  }
}

export default HelloPage;
