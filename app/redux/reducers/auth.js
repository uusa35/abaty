import {GET_AUTH, REMOVE_AUTH, SET_AUTH} from '../actions/types';

export default function (auth = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.payload;
    case GET_AUTH:
      return action.payload;
    case REMOVE_AUTH:
      return {};
    default:
      return auth;
  }
}
