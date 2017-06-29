import React from 'react';
import { withRouter } from 'react-router-dom';

import DropDown from './drop_down';
import AppointmentPanel from './appointment_panel';
import FilePanel from './file_panel';

import AppointmentForm from './appointment_form';
import FileForm from './file_form';

import '../../style/patient_view.scss';
import '../../style/assessment_form.scss';

const modalStyle = {
  content : {
    position                   : 'relative',
    top                        : '50%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    margin                     : 'auto',
    width                      : '540px',
    transform                  : 'translateY(-50%)'
  }
}

class PatientView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentFormOpen : false,
      fileFormOpen : false
    };

    this.openAppointmentForm = this.openAppointmentForm.bind(this);
    this.openFileForm = this.openFileForm.bind(this);
    this.closeAppointmentForm = this.closeAppointmentForm.bind(this);
    this.closeFileForm = this.closeFileForm.bind(this);
    this.handleAppointmentSubmit = this.handleAppointmentSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  openAppointmentForm () {
    this.setState({ appointmentFormOpen : true });
  }

  openFileForm () {
    this.setState({ fileFormOpen : true });
  }

  handleAppointmentSubmit (data) {
    this.props.createAppointment(data, this,closeAppointmentForm);
  }

  closeAppointmentForm () {
    this.setState({ appointmentFormOpen : false });
  }

  handleFileSubmit (data) {
    this.props.createFile(data, this.closeFileForm);
  }

  closeFileForm () {
    this.setState({ fileFormOpen : false });
  }

  renderPatients() {
      let searchFilter = this.state.searchFilter.toLowerCase();

      let filteredPatients = this.props.patients.filter(patient => {
        if (searchFilter === '') {
          return true;
        } else {
          return patient.name.toLowerCase().indexOf(searchFilter) > -1;
        }
      });

      return filteredPatients.map((patient, i) => {
        return (
          <li key={i} onClick={this.handlePatientClick(patient)}>
            {patient.name}
          </li>
        );
      });
  }

  render() {
    let type = this.props.match.url.split("/")[1];
    let { appointmentFormOpen, fileFormOpen } = this.state;
    let {
      currentUser,
      doctors,
      updateAppointment,
      deleteAppointment,
      deleteFile,
      match
    } = this.props;

    let patient = this.props.patients.find(p => {
      return (p.id === parseInt(match.params.patientId));
    })

    return (
      <div className="patient-view-container">
        <h1>{patient.name}</h1>
        <div className="patient-view-info">
          <h3>Date of Birth: {patient.dob}</h3>
          <h3>Email Address: {patient.emailAddress}</h3>
          <h3>Addess: {patient.mailingAddress}</h3>
        </div>
        <div className="patient-view-buttons">
          <button onClick={this.openAppointmentForm}>
          {type === 'doctor' ? 'Schedule Appointment' : 'Request Appointment' }
          </button>
          <button onClick={this.openFileForm}>Upload File</button>
        </div>
        <DropDown component={AppointmentPanel}
                  currentUser={currentUser}
                  data={patient.appointments}
                  doctors={doctors}
                  title="Appointments"
                  onUpdate={updateAppointment}
                  onDelete={deleteAppointment} />
        <DropDown component={FilePanel}
                  data={patient.files}
                  title="Files"
                  onDelete={deleteFile}/>
        <AppointmentForm isOpen={appointmentFormOpen}
                         currentUser={currentUser}
                         onSubmit={this.handleAppointmentSubmit}
                         doctors={doctors}
                         closeForm={this.closeAppointmentForm}
                         style={modalStyle}/>
        <FileForm isOpen={fileFormOpen}
                  currentUser={currentUser}
                  onSubmit={this.handleFileSubmit}
                  closeForm={this.closeFileForm}
                  style={modalStyle}/>
      </div>
    );
  }
}

export default withRouter(PatientView);
