import {CHOOSE_AREA, SET_AREA} from '../actions/types';

export default function (area = {}, action) {
  switch (action.type) {
    case SET_AREA:
      return action.payload;
    case CHOOSE_AREA:
      return action.payload;
    default:
      return area;
  }
}
