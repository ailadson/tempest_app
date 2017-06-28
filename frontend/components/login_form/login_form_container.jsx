import { connect } from 'react-redux';

import { loginDoctor } from '../../actions/session_actions';
import LoginForm from './login_form';


const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = window.location.pathname.slice(1);
  return {
    processForm: user => dispatch(loginDoctor(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
