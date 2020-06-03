import {SET_BEST_SALE_PRODUCTS} from '../actions/types';

export default function (bestSaleProducts = [], action) {
  switch (action.type) {
    case SET_BEST_SALE_PRODUCTS:
      return action.payload;
    default:
      return bestSaleProducts;
  }
}
