import {SET_SEARCH_CLASSIFIEDS} from '../actions/types';

export default function (searchClassifieds = [], action) {
  switch (action.type) {
    case SET_SEARCH_CLASSIFIEDS:
      return action.payload;
    default:
      return searchClassifieds;
  }
}
