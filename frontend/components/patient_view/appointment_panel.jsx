import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

class AppointmentPanel extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        declineModalOpen : false,
        declineReason : ''
      }

      this.declineAppointment = this.declineAppointment.bind(this);
      this.cancelAppointment = this.cancelAppointment.bind(this);
      this.handleDeclineConfirm = this.handleDeclineConfirm.bind(this);
  }

  declineAppointment() {
    this.setState({ declineModalOpen : true });
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

    this.props.onUpdate(data, () => {
      this.setState({ declineModalOpen : false });
    });
  }

  cancelAppointment() {
    let { date, purpose } = this.props.data;

    this.props.onDelete({ date, purpose }, ()=> {
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
      return (<div>Doctor: {doctor.name}</div>);
    } else {
      return (<div></div>);
    }
  }

  render() {
    let { data, doctors } = this.props;

    return (
      <div className="appointment-panel">
        <div>Scheduled: {`${new Date(data.date).toDateString()} @ ${data.time}`}</div>
        <div>Reason: {data.purpose}</div>
        {this.renderDoctor()}
        <div>
          {this.renderDeclineReason() || this.renderCancelButton()}
        </div>
        <Modal isOpen={this.state.declineModalOpen} contentLabel="Decline Confirm">
          <label>Tell the paitient why you're canceling:
            <textarea onChange={this.update('declineReason')}></textarea>
          </label>
          <button onClick={this.handleDeclineConfirm}>Confirm</button>
        </Modal>
      </div>
    );
  }
}

export default withRouter(AppointmentPanel);
