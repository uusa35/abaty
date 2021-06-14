import {TOGGLE_PICKUP} from '../actions/types';

export default function (pickup = false, action) {
  switch (action.type) {
    case TOGGLE_PICKUP:
      return action.payload;
    default:
      return pickup;
  }
}
