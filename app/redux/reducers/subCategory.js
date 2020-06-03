import {SET_SUB_CATEGORY} from '../actions/types';

export default function (subCategory = {}, action) {
  switch (action.type) {
    case SET_SUB_CATEGORY:
      return action.payload;
    default:
      return subCategory;
  }
}
