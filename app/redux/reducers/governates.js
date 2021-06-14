import {SET_GOVERNATES} from '../actions/types';

export default function (governates = [], action) {
  switch (action.type) {
    case SET_GOVERNATES:
      return action.payload;
    default:
      return governates;
  }
}
