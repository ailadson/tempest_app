import React from 'react';
import { withRouter } from 'react-router-dom';

import Modal from 'react-modal';
import merge from 'lodash/merge';

class AppointmentPanel extends React.Component {
  constructor(props){
    super(props);
    let { currentUser, match } = this.props;
    let type = match.url.split("/")[1];
    this.state = {
      date : '',
      time : '',
      purpose : '',
      doctorId : (type === 'doctor' ? currentUser.id : '')
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  validate(data) {
    let { date, time, purpose, doctorId } = this.state;

    if(!date || !time || !purpose || !doctorId) {
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
    console.log(data);
    if (this.validate(data)){
      onSubmit(data, ()=>{console.log('created appointment!');});
    }
  }

  renderDoctorOptions() {
    let { doctors } = this.props;

    return doctors.map((d, i) => {
      return(
        <option key={i} value={d.id}>{`${d.firstName} ${d.lastName}`}</option>
      )
    });
  }

  renderDoctorSelect () {
    let { currentUser, match } = this.props;
    let type = match.url.split("/")[1];

    if (type === 'doctor') {
      return (
        <label>
          Doctor: <input type='text'
                         readOnly
                         value={`${currentUser.firstName} ${currentUser.lastName} (you)`}
                         id="appointment-form-doc"/>
        </label>
      )
    } else {
      return (
        <label>
          Doctor:
          <select onChange={this.update('doctorId')} id="appointment-form-doc">
            <option value=""></option>
            {this.renderDoctorOptions()}
          </select>
        </label>
      )
    }
  }

  render() {
    let { isOpen, closeForm, style } = this.props;

    return (
      <Modal isOpen={isOpen} contentLabel="Appointment Form" style={style}>
        <button onClick={closeForm} style={{float:'right'}}>Close</button>
        <div className="form-container">
          <h2>Schedule an Appointment</h2>
          <label>
            Date: <input type='date'
                         id="appointment-form-date"
                        onChange={this.update('date')} />
          </label>
          <br/>
          <label>
            Time: <input type='time'
                         id="appointment-form-time"
                         onChange={this.update('time')} />
          </label>
          <br/>
          {this.renderDoctorSelect()}
          <br/>
          <label>
            Tell us what wrong?
            <br/>
            <textarea onChange={this.update('purpose')}
                      id="appointment-form-purpose"></textarea>
          </label>
          <button onClick={this.handleSubmit}
                  id="appointment-form-submit">Submit</button>
        </div>
      </Modal>
    );
  }
}

export default withRouter(AppointmentPanel);
