import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import PatientReducer from './patient_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  patient: PatientReducer
});

export default RootReducer;
