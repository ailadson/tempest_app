import { connect } from 'react-redux';

import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  createFile
} from '../../actions/patient_actions';

import PatientView from './patient_view';


const mapStateToProps = ({ patient, session, doctor }) => {
  return {
    currentUser : session.currentUser,
    patients : patient.patients,
    doctors : doctor.doctors,
    flag : patient.flag
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAppointment : (data, cb) => createAppointment(data, dispatch, cb),
    updateAppointment : (data, cb) => updateAppointment(data, dispatch, cb),
    deleteAppointment : (data, cb) => deleteAppointment(data, dispatch, cb),
    createFile : (data, cb) => createFile(data, dispatch, cb)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientView);
