import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

import PatientViewContainer from '../patient_view/patient_view_container';


class PatientHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchFilter : '' };
  }

  componentDidMount() {
    let { currentUser } = this.props;
    let loadCount = 0;

    this.props.fetchPatients((p) => {
      if (++loadCount === 2) {
        this.props.history.push(`home/${currentUser.id}`)
      };
    });

    this.props.fetchDoctors((p) => {
      if (++loadCount === 2) {
        this.props.history.push(`home/${currentUser.id}`)
      };
    });
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
          <li key={i}>
            <Link to={`${this.props.match.url}/${patient.id}`}>{patient.name}</Link>
          </li>
        );
      });
  }

  render() {
    return (
      <div className="patient-home-container">
        <Route path={`${this.props.match.url}/:patientId`} component={PatientViewContainer} />
      </div>
    );
  }
}

export default withRouter(PatientHome);
