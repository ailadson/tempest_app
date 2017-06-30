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

      this.declineAppointment = this.declineAppointment.bind(this);
      this.cancelAppointment = this.cancelAppointment.bind(this);
      this.closeAppointmentForm = this.closeAppointmentForm.bind(this);
      this.handleDeclineConfirm = this.handleDeclineConfirm.bind(this);
  }

  declineAppointment() {
    this.setState({ declineModalOpen : true });
  }

  closeAppointmentForm() {
    this.setState({ declineModalOpen : false });
  }

  handleDeclineConfirm() {
    let { date, purpose } = this.props.data;
    let studentID = this.props.match.url.split("/")[3];

    let data = {
      declineReason : this.state.declineReason,
      date,
      purpose,
      studentID
    };

    this.props.onUpdate(data, this.closeAppointmentForm);
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

  renderDeclineReason () {
    let { data } = this.props;

    if (data.declineReason)
      return (<div>Declined because: {data.declineReason}</div>)
    else
      return false
  }

  renderCancelButton () {
    let { date, time, doctorId } = this.props.data;
    let { currentUser } = this.props;
    let type = this.props.match.url.split("/")[1];
    var selectedDate = Date.parse(date + ' ' + time);
    var now = new Date();

    if (selectedDate > now) {
      if (type === 'doctor' && currentUser.id == doctorId) {
        return (<button onClick={this.declineAppointment}>Decline</button>);
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
      return (<div>Dr. {`${doctor.firstName} ${doctor.lastName}`}</div>);
    } else {
      return (<div></div>);
    }
  }

  renderExclamation () {
    let { currentUser, data } = this.props;

    if (currentUser.id === data.doctorId &&
        new Date() <= new Date(data.date + " " + data.time) &&
        !data.declineReason){
      return(<span className="appointment-notice">!</span>)
    } else {
      return("")
    }
  }

  render() {
    let { data, doctors } = this.props;

    return (
      <div className="appointment-panel">
        {this.renderExclamation()}
        <div>Scheduled: {`${new Date(data.date).toDateString()} @ ${data.time}`}</div>
        <div>Reason: {data.purpose}</div>
        {this.renderDoctor()}
        <div>
          {this.renderDeclineReason() || this.renderCancelButton()}
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
