import {SET_BRANCHES} from '../actions/types';

export default function (branches = [], action) {
  switch (action.type) {
    case SET_BRANCHES:
      return action.payload;
    default:
      return branches;
  }
}
