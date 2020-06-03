import {SET_COMMENTS, GET_COMMENTS, ADD_COMMENT} from '../actions/types';

export default function (comments = [], action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      return comments.concat(action.payload);
    default:
      return comments;
  }
}
