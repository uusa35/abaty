import {SET_PAGES} from '../actions/types';

export default function (pages = [], action) {
  switch (action.type) {
    case SET_PAGES:
      return action.payload;
    default:
      return pages;
  }
}
