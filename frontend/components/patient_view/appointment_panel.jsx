import React from 'react';

class AppointmentPanel extends React.Component {
  render() {
    console.log("here");
    let { data } = this.props;

    return (
      <div className="appointment-panel">
        <div>Scheduled: {`${new Date(data.date).toDateString()} @ ${data.time}`}</div>
        <div>
          <h3>Reason</h3>
          {data.purpose}
        </div>
        <div>
          {data.declineReason || <button onClick={this.declineAppointment}>Decline</button>}
        </div>
      </div>
    );
  }
}

export default AppointmentPanel;
