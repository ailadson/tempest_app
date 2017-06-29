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

export const fetchCurrentUser = (dispatch, cb, err) => {
  APIUtil.fetchCurrentUser(user => {
    dispatch(receiveCurrentUser(user))
    if (cb) cb(user);
  }, e => {
    if (err) err()
  });
};

export const loginDoctor = (data, dispatch, cb) => {
  APIUtil.login(data, "doctor", user => {
    dispatch(receiveCurrentUser(user))
    if (cb) cb(user)
  }, err => {
    console.log(err);
    dispatch(receiveErrors(err.responseJSON.errors))
  });
};

export const loginPatient = (user, dispatch, cb) => (
  APIUtil.login(user, "patient", user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON.errors))
  ))
);

export const logout = (dispatch, cb) => {
  APIUtil.logout(() => {
    dispatch(receiveCurrentUser(null));
    if (cb) cb();
  }, (err) => {
    console.log(err);
  });
};
