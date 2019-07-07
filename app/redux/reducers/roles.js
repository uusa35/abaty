import {GET_ROLES} from '../actions/types';

export default function(roles = [], action) {
  switch (action.type) {
    case GET_ROLES:
      return action.payload;
    default:
      return roles;
  }
}
