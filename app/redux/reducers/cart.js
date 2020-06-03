import {ADD_TO_CART, FILTER_CART, CLEAR_CART} from '../actions/types';

export default function (cart = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return cart.concat(action.payload);
    case FILTER_CART:
      return action.payload;
    case CLEAR_CART:
      return [];
    default:
      return cart;
  }
}
