import {SET_COLLECTIONS} from '../actions/types';

export default function (collections = [], action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return action.payload;
    default:
      return collections;
  }
}
