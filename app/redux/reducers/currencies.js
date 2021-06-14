import {SET_CURRENCIES} from '../actions/types';

export default function (currencies = [], action) {
  switch (action.type) {
    case SET_CURRENCIES:
      return action.payload;
    default:
      return currencies;
  }
}
