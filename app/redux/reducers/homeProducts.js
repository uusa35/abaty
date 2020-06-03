import {SET_HOME_PRODUCTS} from '../actions/types';

export default function (homeProducts = [], action) {
  switch (action.type) {
    case SET_HOME_PRODUCTS:
      return action.payload;
    default:
      return homeProducts;
  }
}
