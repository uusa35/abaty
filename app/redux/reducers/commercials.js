import {SET_COMMERCIALS} from '../actions/types';

export default function (commercials = [], action) {
  switch (action.type) {
    case SET_COMMERCIALS:
      return action.payload;
    default:
      return commercials;
  }
}
