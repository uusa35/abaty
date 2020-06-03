import {SET_BRANDS} from '../actions/types';

export default function (brands = [], action) {
  switch (action.type) {
    case SET_BRANDS:
      return action.payload;
    default:
      return brands;
  }
}
