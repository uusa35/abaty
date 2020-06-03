import {GET_GROSS_TOTAL_CART, SET_GROSS_TOTAL_CART} from '../actions/types';

export default function (grossTotal = 0, action) {
  switch (action.type) {
    case GET_GROSS_TOTAL_CART:
      return total;
    case SET_GROSS_TOTAL_CART:
      return action.payload;
    default:
      return grossTotal;
  }
}
