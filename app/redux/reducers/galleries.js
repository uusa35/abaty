import {SET_GALLERIES} from '../actions/types';

export default function(galleries = [], action) {
  switch (action.type) {
    case SET_GALLERIES:
      return action.payload;
    default:
      return galleries;
  }
}
