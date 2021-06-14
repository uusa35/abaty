import {SET_BRANCH} from '../actions/types';

export default function (branch = {}, action) {
  switch (action.type) {
    case SET_BRANCH:
      return action.payload;
    default:
      return branch;
  }
}
