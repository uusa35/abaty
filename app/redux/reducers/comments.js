import {SET_COMMENTS, GET_COMMENTS} from '../actions/types';

export default function(categories = [], action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case GET_COMMENTS:
      return action.payload;
    default:
      return categories;
  }
}
