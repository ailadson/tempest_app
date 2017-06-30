import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import '../../style/login_form.scss';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.fetchCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      // this.props.history.push('/');
      console.log("Logged in!");
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { loginDoctor, loginPatient } = this.props;
    const user = this.state;
    const formType = window.location.pathname.slice(1);
    let login = (formType === 'doctor' ? loginDoctor : loginPatient);
    login({ user });
  }

  renderAltLoginLink() {
    if (this.props.path === '/') {
      return(
        <Link to="/doctor">
          <span className="alt-login-link">Are you a doctor? Login here.</span>
        </Link>
      );
    } else {
      return(
        <Link to="/">
          <span className="alt-login-link">Are you a patient? Login here.</span>
        </Link>
      );
    }
  }

  renderMessage() {
    if (this.props.path === '/') {
      return <div className="login-msg">Patient Portal.<br/>Manage your health.</div>;
    } else {
      return <div className="login-msg">Doctor Portal.<br/>Manage your patients.</div>;
    }
  }

  renderErrors() {
    return(
      <ul className="login-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          {this.renderMessage()}
          <br/>
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Username: <input type="text"
                                    value={this.state.emailAddress}
                                    onChange={this.update('emailAddress')}
                                    className="login-input"
                                    />
            </label>
            <br/>
            <label>Password: <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                    />
            </label>
            <br/>
            <input type="submit" value="Login" />
          </div>
        </form>
        {this.renderAltLoginLink()}
      </div>
    );
  }
}

export default withRouter(SessionForm);
