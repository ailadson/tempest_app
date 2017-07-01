import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

import PatientViewContainer from '../patient_view/patient_view_container';

import '../../style/doctor_home.scss';

class DoctorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchFilter : '', asideExpanded : false };
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.toggleAside = this.toggleAside.bind(this);
    this.closeAside = this.closeAside.bind(this);
  }

  componentDidMount() {
    this.props.fetchPatients();
    this.props.fetchDoctors();
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

  controlScroll(node) {
    if (node) {
      node.addEventListener('scroll', (e) => {
        e.stopPropagation();
        console.log('scroll!');
      });
    }
  }

  toggleAside(){
    this.setState({ asideExpanded : !this.state.asideExpanded });
  }

  closeAside(){
    this.setState({ asideExpanded : false });
  }

  renderExclamation (patient, id, currentTime) {
    let appointment = patient.appointments.find(a => {

      return (
        a.doctorId === id &&
        currentTime <= new Date(a.date + " " + a.time) &&
        !a.declineReason && !a.accepted
      );
    });

    if (appointment) {
      return (<span className="appointment-notice-yellow">!</span>);
    } else {
      return (<span></span>);
    }
  }
  renderPatients() {
      let searchFilter = this.state.searchFilter.toLowerCase();
      let id = this.props.currentUser.id;
      let currentDate = new Date();

      let filteredPatients = this.props.patients.filter(patient => {
        if (searchFilter === '') {
          return true;
        } else {
          return (`${patient.firstName} ${patient.lastName}`).toLowerCase().indexOf(searchFilter) > -1;
        }
      });

      return filteredPatients.map((patient, i) => {
        return (
          <li key={i}>
            <Link to={`${this.props.match.url}/${patient.id}`}
                  onClick={this.closeAside}>
              {`${patient.firstName} ${patient.lastName}`}
              {this.renderExclamation(patient, id, currentDate)}
              </Link>
          </li>
        );
      });
  }

  render() {
    let { currentUser } = this.props;
    let asideClassName = (this.state.asideExpanded ? "" : "aside-minimized");
    let asideExpandText = (this.state.asideExpanded ? "Hide Patients" : "Show Patients");

    return (
      <div className="doctor-home-container group">
        <aside ref={this.controlScroll}>
          <div className={"aside-patients " + asideClassName}>
            <h2 className="aside-welcome">
              Welcome, Dr. {currentUser.lastName}
              </h2>
            <input type="text"
              className="doctor-search-bar"
              placeholder="Search By Name"
              onChange={this.update('searchFilter')} />
            <h3>Paitents</h3>
            <ul>{this.renderPatients()}</ul>
          </div>
          <div className="drop-down-link" onClick={this.toggleAside}>
            {asideExpandText}
          </div>
        </aside>
        <section>
          <Route path={`${this.props.match.url}/:patientId`} component={PatientViewContainer} />
        </section>
      </div>
    );
  }
}

export default withRouter(DoctorHome);
