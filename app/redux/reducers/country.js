import {CHOOSE_COUNTRY, SET_COUNTRY} from '../actions/types';

export default function (country = {}, action) {
  switch (action.type) {
    case SET_COUNTRY:
      return action.payload;
    case CHOOSE_COUNTRY:
      return action.payload;
    default:
      return country;
  }
}
