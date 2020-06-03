import {UPDATE_CLASSIFIED, STORE_CLASSIFIED} from '../actions/types';

export default function (newClassified = {}, action) {
  switch (action.type) {
    case UPDATE_CLASSIFIED:
      return action.payload;
    case STORE_CLASSIFIED:
      return action.payload;
    default:
      return newClassified;
  }
}
