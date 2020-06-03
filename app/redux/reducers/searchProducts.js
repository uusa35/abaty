import {SET_SEARCH_PRODUCTS} from '../actions/types';

export default function (searchProducts = [], action) {
  switch (action.type) {
    case SET_SEARCH_PRODUCTS:
      return action.payload;
    default:
      return searchProducts;
  }
}
