import {SET_PRODUCT_COLORS} from '../actions/types';

export default function (productColors = [], action) {
  switch (action.type) {
    case SET_PRODUCT_COLORS:
      return action.payload;
    default:
      return productColors;
  }
}
