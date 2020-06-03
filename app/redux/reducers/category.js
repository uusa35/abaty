import {SET_CATEGORY} from '../actions/types';

export default function (category = {}, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    default:
      return category;
  }
}
