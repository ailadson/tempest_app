import { createStore, applyMiddleware } from 'redux';

import RootReducer from './root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
  )
);

export default configureStore;
