import {GO_DEEP_LINKING, SET_DEEP_LINKING} from '../actions/types';

export default function (linking = {}, action) {
  switch (action.type) {
    case SET_DEEP_LINKING:
      return action.payload;
    default:
      return linking;
  }
}
