import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import HeaderContainer from './header/header_container';
import LoadingContainer from './loading_screen/loading_screen_container';
import DoctorHomeContainer from './doctor_home/doctor_home_container';
import PatientHomeContainer from './patient_home/patient_home_container';
import LoginFormContainer from './login_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="app-container">
    <LoadingContainer />
    <HeaderContainer/>
    <video src="https://assets.securetempus.com/website/efa53d066f1b3b4ad9ad0a758d8be67471a0cfe1/1457490542e9515b1fe39a53dfa5ea64.mp4"
           autoPlay
           loop>
    </video>
    <Switch>
      <AuthRoute exact path="/" component={LoginFormContainer} />
      <AuthRoute exact path="/doctor" component={LoginFormContainer} />
      <ProtectedRoute path="/doctor/home" component={DoctorHomeContainer} />
      <ProtectedRoute path="/patient/home" component={PatientHomeContainer} />
    </Switch>
  </div>
);

export default App;
