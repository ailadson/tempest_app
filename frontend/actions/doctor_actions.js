import * as APIUtil from '../util/doctor_api_util'

export const RECEIVE_ALL_DOCTORS = 'RECEIVE_ALL_DOCTORS';

export const receiveAllDoctors = doctors => ({
  type: RECEIVE_ALL_DOCTORS,
  doctors
});

export const fetchDoctors = (dispatch, cb) => {
  APIUtil.fetchDoctors(doctors => {
    dispatch(receiveAllDoctors(doctors))
    if (cb) cb(doctors);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};
