import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import RootReducer from './root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
    // applyMiddleware(thunk, logger)
  )
);

export default configureStore;
