import {SET_COLORS} from '../actions/types';

export default function (colors = [], action) {
  switch (action.type) {
    case SET_COLORS:
      return action.payload;
    default:
      return colors;
  }
}
