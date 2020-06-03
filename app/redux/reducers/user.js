import {SET_USER} from '../actions/types';

export default function (user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return user;
  }
}
