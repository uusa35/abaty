import {SET_ORDERS} from '../actions/types';

export default function (orders = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;
    default:
      return orders;
  }
}
