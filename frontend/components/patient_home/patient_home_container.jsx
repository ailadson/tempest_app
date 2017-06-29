import { connect } from 'react-redux';

import { fetchPatients } from '../../actions/patient_actions';
import { fetchDoctors } from '../../actions/doctor_actions';
import PatientHome from './patient_home';


const mapStateToProps = ({ patient, session, doctor }) => {
  return {
    currentUser : session.currentUser,
    patients: patient.patients,
    doctors : doctor.doctors
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatients : (cb) => fetchPatients(dispatch, cb),
    fetchDoctors : (cb) => fetchDoctors(dispatch, cb)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientHome);
