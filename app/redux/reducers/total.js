import {SET_TOTAL_CART, GET_TOTAL_CART} from '../actions/types';

export default function (total = 0, action) {
  switch (action.type) {
    case GET_TOTAL_CART:
      return total;
    case SET_TOTAL_CART:
      return action.payload;
    default:
      return total;
  }
}
