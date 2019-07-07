import {TOGGLE_LOADING} from '../actions/types';

export default function(isLoading = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return action.payload;
    default:
      return isLoading;
  }
}
