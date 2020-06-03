import {GET_ROLES, SET_ROLES} from '../actions/types';

export default function (roles = [], action) {
  switch (action.type) {
    case GET_ROLES:
      return action.payload;
    case SET_ROLES:
      return action.payload;
    default:
      return roles;
  }
}
