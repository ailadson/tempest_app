import merge from 'lodash/merge';

import {
  TOGGLE_LOADING
} from '../actions/loading_actions';

const defaultState = Object.freeze({
  loading : false
});

const LoadingReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case TOGGLE_LOADING:
      return { loading : !state.loading };
    default:
      return state;
  }
};

export default LoadingReducer;
