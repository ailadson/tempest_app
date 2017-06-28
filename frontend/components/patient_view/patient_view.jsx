import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class PatientView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient : this.props.patients.find(p => {
        return (p.id === parseInt(this.props.match.params.patientId));
      })
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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
    let { patient } = this.state;

    return (
      <div className="patient-view-container">
        <h1>{patient.name}</h1>
      </div>
    );
  }
}

export default withRouter(PatientView);
