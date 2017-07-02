import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn }) => {
  let redirectTo = path == '/' ? '/patient/home' : '/doctor/home';

  return(
    <Route path={path}
                render={(props) => {
                  return !loggedIn ? (<Component {...props} path={path} />) : (<Redirect to={redirectTo} />);
                }}
    />
  )
};

const Protected = ({ component: Component, path, loggedIn }) => {
  let redirectTo = path == '/doctor/home' ? '/doctor' : '/';

  return (
    <Route path={path}
           render={(props) => {
              return loggedIn ? (<Component {...props} />) : (<Redirect to={redirectTo} />);
           }}
    />
  )
};

const mapStateToProps = state => (
  {
    loggedIn: Boolean(state.session.currentUser),
  }
);

export const AuthRoute = withRouter(
  connect(mapStateToProps, null)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);
