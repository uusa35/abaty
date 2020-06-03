import {SET_ON_SALE_PRODUCTS} from '../actions/types';

export default function (onSaleProducts = [], action) {
  switch (action.type) {
    case SET_ON_SALE_PRODUCTS:
      return action.payload;
    default:
      return onSaleProducts;
  }
}
