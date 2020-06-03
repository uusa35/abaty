import {SET_COUPON, REMOVE_COUPON} from '../actions/types';

export default function (coupon = {}, action) {
  switch (action.type) {
    case SET_COUPON:
      return action.payload;
    case REMOVE_COUPON:
      return {};
    default:
      return coupon;
  }
}
