import {SET_COLLECTION} from '../actions/types';

export default function (collection = {}, action) {
  switch (action.type) {
    case SET_COLLECTION:
      return action.payload;
    default:
      return collection;
  }
}
