import {SET_DESIGNER} from '../actions/types';

export default function (designer = {}, action) {
  switch (action.type) {
    case SET_DESIGNER:
      return action.payload;
    default:
      return designer;
  }
}
