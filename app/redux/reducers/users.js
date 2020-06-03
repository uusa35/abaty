import {SET_USERS, GET_USERS} from '../actions/types';

export default function (users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case GET_USERS:
      return [];
    default:
      return users;
  }
}
