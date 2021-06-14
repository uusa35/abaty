import {SET_GOVERNATE} from '../actions/types';

export default function (governate = [], action) {
  switch (action.type) {
    case SET_GOVERNATE:
      return action.payload;
    default:
      return governate;
  }
}
