import {TOGGLE_BOOTSTRAPPED} from '../actions/types';

export default function(bootStrapped = false, action) {
  switch (action.type) {
    case TOGGLE_BOOTSTRAPPED:
      return action.payload;
    default:
      return bootStrapped;
  }
}
