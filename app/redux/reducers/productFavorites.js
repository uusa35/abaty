import {SET_PRODUCT_FAVORITES, GET_PRODUCT_FAVORITES} from '../actions/types';

export default function (productFavorites = [], action) {
  switch (action.type) {
    case SET_PRODUCT_FAVORITES:
      return action.payload;
    case GET_PRODUCT_FAVORITES:
      return action.payload;
    default:
      return productFavorites;
  }
}
