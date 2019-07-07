import {SET_ROLE} from '../actions/types';

export default function(role = {}, action) {
  switch (action.type) {
    case SET_ROLE:
      return action.payload;
    default:
      return role;
  }
}
