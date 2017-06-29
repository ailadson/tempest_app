import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Header from './header';


const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser)
  }
};

const mapDispatchToProps = (dispatch) => {
  const formType = window.location.pathname.slice(1);
  return {
    logout: (cb) => logout(dispatch, cb),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
