import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import PatientReducer from './patient_reducer';
import DoctorReducer from './doctor_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  doctor: DoctorReducer,
  patient: PatientReducer
});

export default RootReducer;
