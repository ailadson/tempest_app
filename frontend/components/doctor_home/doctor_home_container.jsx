import { connect } from 'react-redux';

import { fetchPatients } from '../../actions/patient_actions';
import DoctorHome from './doctor_home';


const mapStateToProps = ({ patient, session }) => {
  return {
    currentUser : session.currentUser,
    patients: patient.patients
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatients : (cb) => fetchPatients(dispatch, cb)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorHome);
