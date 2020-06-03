import {SET_COLOR} from '../actions/types';

export default function (color = {}, action) {
  switch (action.type) {
    case SET_COLOR:
      return action.payload;
    default:
      return color;
  }
}
