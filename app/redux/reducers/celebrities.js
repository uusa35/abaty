import {SET_CELEBRITIES} from '../actions/types';

export default function (celebrities = [], action) {
  switch (action.type) {
    case SET_CELEBRITIES:
      return action.payload;
    default:
      return celebrities;
  }
}
