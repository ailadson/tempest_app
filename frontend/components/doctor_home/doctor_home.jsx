import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

import PatientViewContainer from '../patient_view/patient_view_container';


class DoctorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchFilter : '' };
    this.handlePatientClick = this.handlePatientClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPatients((p) => {
      console.log(p);
    })
  }

  handlePatientClick(patient) {
    return () => {
      this.props.history.push(`home/${patient.id}`)
    }
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
      <div className="doctor-home-container">
        <aside>
          <input type="text"
                 className="doctor-search-bar"
                 onChange={this.update('searchFilter')} />
          <ul>{this.renderPatients()}</ul>
        </aside>
        <Route path={`${this.props.match.url}/:patientId`} component={PatientViewContainer} />
      </div>
    );
  }
}

export default withRouter(DoctorHome);
