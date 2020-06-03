import {TOGGLE_IS_CONNECTED} from '../actions/types';

export default function (isConnected = true, action) {
  switch (action.type) {
    case TOGGLE_IS_CONNECTED:
      return action.payload;
    default:
      return isConnected;
  }
}
