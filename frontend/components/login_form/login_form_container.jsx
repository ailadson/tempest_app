import { connect } from 'react-redux';

import { loginDoctor, loginPatient, fetchCurrentUser } from '../../actions/session_actions';
import LoginForm from './login_form';


const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
};

const mapDispatchToProps = (dispatch) => {
  const formType = window.location.pathname.slice(1);
  return {
    loginDoctor: (user, cb) => loginDoctor(user, dispatch, cb),
    loginPatient: (user, cb) => loginPatient(user, dispatch, cb),
    fetchCurrentUser : (cb, err) => fetchCurrentUser(dispatch, cb, err),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
