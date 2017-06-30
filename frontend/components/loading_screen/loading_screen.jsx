import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

import PatientViewContainer from '../patient_view/patient_view_container';

import '../../style/loading.scss';

class LoadingScreen extends React.Component {
  render() {
    let { loading } = this.props;
    let hidden = (loading ? "" : "loading-hidden");

    return (
      <div className={`loading-screen ${hidden}`}>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoadingScreen);
