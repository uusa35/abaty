import {SET_BRAND} from '../actions/types';

export default function (brand = {}, action) {
  switch (action.type) {
    case SET_BRAND:
      return action.payload;
    default:
      return brand;
  }
}
