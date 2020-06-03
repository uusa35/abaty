import {SET_LATEST_PRODUCTS} from '../actions/types';

export default function (latestProducts = [], action) {
  switch (action.type) {
    case SET_LATEST_PRODUCTS:
      return action.payload;
    default:
      return latestProducts;
  }
}
