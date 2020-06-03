import {SET_SIZES} from '../actions/types';

export default function (sizes = [], action) {
  switch (action.type) {
    case SET_SIZES:
      return action.payload;
    default:
      return sizes;
  }
}
