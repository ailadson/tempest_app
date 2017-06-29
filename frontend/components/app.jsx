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
import DoctorHomeContainer from './doctor_home/doctor_home_container';
import PatientHomeContainer from './patient_home/patient_home_container';
import LoginFormContainer from './login_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="app-container">
    <HeaderContainer/>
    <Switch>
      <AuthRoute exact path="/" component={LoginFormContainer} />
      <AuthRoute exact path="/doctor" component={LoginFormContainer} />
      <ProtectedRoute path="/doctor/home" component={DoctorHomeContainer} />
      <ProtectedRoute path="/patient/home" component={PatientHomeContainer} />
    </Switch>
  </div>
);

export default App;
