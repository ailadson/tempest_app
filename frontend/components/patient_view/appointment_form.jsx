import React from 'react';
import { withRouter } from 'react-router-dom';

import Modal from 'react-modal';
import merge from 'lodash/merge';

class AppointmentPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date : '',
      time : '',
      purpose : ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  validate(data) {
    let { date, time, purpose } = this.state;

    if(!date || !time || !purpose) {
      alert("Must fill in all fields");
      return false;
    }

    var selectedDate = Date.parse(date + ' ' + time);
    var now = new Date();

    if (selectedDate < now) {
      alert("Date must be in the future");
      return false;
    }

    return true;
  }

  handleSubmit () {
    let { currentUser, onSubmit, match } = this.props;
    let type = match.url.split("/")[1];
    let studentID = match.url.split("/")[3];
    let data = {
      type,
      id : currentUser.id,
      studentID,
      appointment : this.state
    };
    if (this.validate(data)){
      onSubmit(data, ()=>{console.log('created appointment!');});
    }
  }

  render() {
    let { isOpen } = this.props;

    return (
      <Modal isOpen={isOpen} contentLabel="Appointment Form">
        <div>
          <label>Date: <input type='date' onChange={this.update('date')} /></label>
          <label>Time: <input type='time' onChange={this.update('time')} /></label>
          <label>
            What wrong?: <textarea onChange={this.update('purpose')}></textarea>
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Modal>
    );
  }
}

export default withRouter(AppointmentPanel);
