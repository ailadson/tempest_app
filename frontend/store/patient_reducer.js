import merge from 'lodash/merge';

import {
  RECEIVE_ALL_PATIENTS,
  UPDATE_PATIENT
} from '../actions/patient_actions';

const defaultState = Object.freeze({
  patients : []
  // errors: []
});

const PatientReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_ALL_PATIENTS:
      const patients = action.patients;
      return merge({}, defaultState, { patients });
    case UPDATE_PATIENT:
      const target = action.patient.emailAddress;
      const updatedPatients = state.patients.map(p => {
        return (p.emailAddress == target ? action.patient : p)
      });
      return { patients : updatedPatients };
    default:
      return state;
  }
};

export default PatientReducer;
