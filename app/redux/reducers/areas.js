import {SET_AREAS} from '../actions/types';

export default function (areas = [], action) {
  switch (action.type) {
    case SET_AREAS:
      return action.payload;
    default:
      return areas;
  }
}
