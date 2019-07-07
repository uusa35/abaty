import {SET_CURRENCY} from '../actions/types';

export default function(currency = '', action) {
  switch (action.type) {
    case SET_CURRENCY:
      return action.payload;
    default:
      return currency;
  }
}
