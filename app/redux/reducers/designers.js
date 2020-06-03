import {SET_DESIGNERS} from '../actions/types';

export default function (designers = [], action) {
  switch (action.type) {
    case SET_DESIGNERS:
      return action.payload;
    default:
      return designers;
  }
}
