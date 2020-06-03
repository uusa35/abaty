import {SET_HOT_DEALS_PRODUCTS} from '../actions/types';

export default function (hotDealsProducts = [], action) {
  switch (action.type) {
    case SET_HOT_DEALS_PRODUCTS:
      return action.payload;
    default:
      return hotDealsProducts;
  }
}
