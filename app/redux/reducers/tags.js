import {SET_TAGS} from '../actions/types';

export default function (tags = [], action) {
  switch (action.type) {
    case SET_TAGS:
      return action.payload;
    default:
      return tags;
  }
}
