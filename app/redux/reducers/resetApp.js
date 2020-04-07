import {TOGGLE_RESET_APP} from '../actions/types';

export default function(resetApp = true, action) {
  switch (action.type) {
    case TOGGLE_RESET_APP:
      return action.payload;
    default:
      return resetApp;
  }
}
