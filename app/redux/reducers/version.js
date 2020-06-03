import {SET_VERSION, GET_VERSION} from '../actions/types';

export default function (version = '', action) {
  switch (action.type) {
    case SET_VERSION:
      return action.payload;
    case GET_VERSION:
      return action.payload;
    default:
      return version;
  }
}
