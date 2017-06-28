import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import DoctorHomeContainer from './doctor_home/doctor_home_container';
import LoginFormContainer from './login_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <Link to="/" className="header-link">
        <h1>Tempus Test App!</h1>
      </Link>
    </header>
    <Switch>
      <AuthRoute exact path="/" component={LoginFormContainer} />
      <AuthRoute exact path="/doctor" component={LoginFormContainer} />
      <ProtectedRoute path="/doctor/home" component={DoctorHomeContainer} />
    </Switch>
  </div>
);

export default App;
