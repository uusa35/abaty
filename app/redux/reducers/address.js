import {SET_ADDRESS} from '../actions/types';

export default function (address = {}, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return action.payload;
    default:
      return address;
  }
}
