import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

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
    width                      : '50%',
    minWidth                   : '400px',
    transform                  : 'translateY(-50%)'
  }
}

class AppointmentForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        declineModalOpen : false,
        declineReason : ''
      }

      this.acceptAppointment = this.acceptAppointment.bind(this);
      this.declineAppointment = this.declineAppointment.bind(this);
      this.cancelAppointment = this.cancelAppointment.bind(this);
      this.closeAppointmentForm = this.closeAppointmentForm.bind(this);
      this.handleDeclineConfirm = this.handleDeclineConfirm.bind(this);
  }

  acceptAppointment() {
    let { id } = this.props.data;
    let patientId = this.props.match.url.split("/")[3];
    let appointment = { id, accepted : true };
    this.props.onUpdate({ appointment, patientId }, this.closeAppointmentForm);
  }

  declineAppointment() {
    this.setState({ declineModalOpen : true });
  }

  closeAppointmentForm() {
    this.setState({ declineModalOpen : false });
  }

  handleDeclineConfirm() {
    let { id } = this.props.data;
    let patientId = this.props.match.url.split("/")[3];
    let appointment = {
      id,
      declineReason : this.state.declineReason,
    };

    this.props.onUpdate({ appointment, patientId }, this.closeAppointmentForm);
  }

  cancelAppointment() {
    let { currentUser, data } = this.props;

    this.props.onDelete({ appointment : data, studentID : currentUser.id }, ()=> {
      console.log('deleted!');
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  renderReason () {
    let { data } = this.props;

    if (data.declineReason) {
      return (
        <div>
          <span className="panel-label">
            Declined because:
          </span> {data.declineReason}
        </div>
      );
    } else if(data.accepted) {
      return (
        <div>
          <span className="panel-label">
            Accepted!
          </span>
        </div>
      );
    }
    return false;
  }

  renderButtons () {
    let { date, time, doctorId } = this.props.data;
    let { currentUser } = this.props;
    let type = this.props.match.url.split("/")[1];
    var selectedDate = Date.parse(date + ' ' + time);
    var now = new Date();

    if (selectedDate > now) {
      if (type === 'doctor' && currentUser.id == doctorId) {
        return (
          <div className="group" style={{ marginTop : '0.5em'}}>
            <button onClick={this.acceptAppointment}>Accept</button>
            <button style={{ marginLeft : '6em'}}
                    onClick={this.declineAppointment}>Decline</button>
          </div>
        );
      } else if (type === 'patient') {
        return (<button onClick={this.cancelAppointment}>Cancel</button>);
      }
    }

    return "";
  }

  renderDoctor(){
    let { data, doctors } = this.props;
    let doctor = doctors.find(d => (d.id == data.doctorId))
    if (doctor){
      return (
        <div>
          <span className="panel-label">
            With:
          </span> Dr. {`${doctor.firstName} ${doctor.lastName}`}
        </div>);
    } else {
      return (<div></div>);
    }
  }

  renderDoctorExclamation (data) {
    if (data.accepted) {
      return(
        <span style={{ fontSize : '0.6em' }}>
          <span className="appointment-notice-green">!</span> Upcoming!
        </span>
      );
    } else if (!data.declineReason) {
      return(
        <span style={{ fontSize : '0.6em' }}>
          <span className="appointment-notice-yellow">!</span> Accept or Decline
        </span>
      );
    } else {
      return(
        <span style={{ fontSize : '0.6em' }}>
          Declined
        </span>
      );
    }

    return("");
  }

  renderPatientExclamation (data) {
    if (data.accepted) {
      return(
        <span style={{ fontSize : '0.6em' }}>
          <span className="appointment-notice-green">!</span> Upcoming!
        </span>
      );
    } else if (!data.declineReason) {
      return(
        <span style={{ fontSize : '0.6em' }}>
          <span className="appointment-notice-yellow">!</span> Pending
        </span>
      );
    } else {
      return(
        <span style={{ fontSize : '0.6em' }}>
          <span className="appointment-notice-red">!</span> Declined
        </span>
      );
    }

    return("");
  }

  renderExclamation () {
    let { currentUser, data } = this.props;
    let upcoming = new Date() <= new Date(data.date + " " + data.time);

    if (currentUser.id === data.doctorId && upcoming){
      return this.renderDoctorExclamation(data);
    } else if(currentUser.id === data.patientId && upcoming) {
      return this.renderPatientExclamation(data);
    }

    return("");
  }

  render() {
    let { data, doctors } = this.props;

    return (
      <div className="appointment-panel">
        {this.renderExclamation()}
        <div>
          <span className="panel-label">
            Scheduled:
          </span> {`${new Date(data.date + " " + data.time).toDateString()} @ ${data.time}`}
        </div>
        {this.renderDoctor()}
        <div>
          <span className="panel-label">
            Reason:
          </span> {data.purpose}
        </div>
        <div>
          {this.renderReason() || this.renderButtons()}
        </div>
        <Modal style={modalStyle} isOpen={this.state.declineModalOpen} contentLabel="Decline Confirm">
          <div className="form-container">
            <button onClick={this.closeAppointmentForm}>Close</button>
            <h4>Tell the paitient why you're canceling</h4>
            <textarea onChange={this.update('declineReason')}></textarea>
            <br/>
            <button onClick={this.handleDeclineConfirm}>Confirm</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(AppointmentForm);
