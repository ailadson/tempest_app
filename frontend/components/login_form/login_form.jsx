import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const user = this.state;
    this.props.processForm({user}, user => {
      console.log(user);
    });
  }

  renderAltLoginLink() {
    if (this.props.path === '/') {
      return <Link to="/doctor">Are you a doctor? Login here.</Link>;
    } else {
      return <Link to="/">Are you a patient? Login here.</Link>;
    }
  }

  renderMessage() {
    if (this.props.path === '/') {
      return <div className="login-msg">Patient Portal. Welcome to your health.</div>;
    } else {
      return <div className="login-msg">Doctor Portal. Manage your patients.</div>;
    }
  }

  renderErrors() {
    return(
      <ul>
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
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </div>
        </form>
        {this.renderAltLoginLink()}
      </div>
    );
  }
}

export default withRouter(SessionForm);
