import {SET_PRODUCT} from '../actions/types';

export default function (product = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.payload;
    default:
      return product;
  }
}
