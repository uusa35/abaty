import {SET_CATEGORIES} from '../actions/types';

export default function(categories = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return categories;
  }
}
