import merge from 'lodash/merge';

import {
  RECEIVE_ALL_DOCTORS
} from '../actions/doctor_actions';

const defaultState = Object.freeze({
  doctors : [],
  flag : false
  // errors: []
});

const PatientReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_ALL_DOCTORS:
      const doctors = action.doctors;
      return merge({}, defaultState, { doctors });
    default:
      return state;
  }
};

export default PatientReducer;
