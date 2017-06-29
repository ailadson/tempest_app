import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import '../../style/header.scss';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logout();
  }

  render() {
    return (
      <header className="site-header">
        <span>Tempus Test App</span>
        { this.props.loggedIn ? <button onClick={this.logout}>Logout</button> : "" }
        { !this.props.loggedIn ? <Redirect to="/" /> : ""}
      </header>
    );
  }
}

export default withRouter(Header);
