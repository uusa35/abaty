import {SET_CELEBRITY} from '../actions/types';

export default function (celebrity = {}, action) {
  switch (action.type) {
    case SET_CELEBRITY:
      return action.payload;
    default:
      return celebrity;
  }
}
