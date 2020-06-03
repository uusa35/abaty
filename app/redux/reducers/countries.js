import {SET_COUNTRIES} from '../actions/types';

export default function (countries = [], action) {
  switch (action.type) {
    case SET_COUNTRIES:
      return action.payload;
    default:
      return countries;
  }
}
