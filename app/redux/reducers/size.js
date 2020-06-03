import {SET_SIZE} from '../actions/types';

export default function (size = {}, action) {
  switch (action.type) {
    case SET_SIZE:
      return action.payload;
    default:
      return size;
  }
}
