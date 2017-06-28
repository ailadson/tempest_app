import * as APIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const loginDoctor = (data, dispatch, cb) => {
  APIUtil.login(data, "doctor", user => {
    dispatch(receiveCurrentUser(user))
    if (cb) cb(user)
  }, err => {
    console.log(err);
    dispatch(receiveErrors(err.responseJSON))
  });
};

export const loginPatient = user => dispatch => (
  APIUtil.login(user, "patient").then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(receiveCurrentUser(null))
  ))
);
