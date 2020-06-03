import {SET_PRODUCTS} from '../actions/types';

export default function (products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return products;
  }
}
