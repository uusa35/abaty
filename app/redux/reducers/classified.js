import {SET_CLASSIFIED} from '../actions/types';

export default function (classified = {}, action) {
  switch (action.type) {
    case SET_CLASSIFIED:
      return action.payload;
    default:
      return classified;
  }
}
