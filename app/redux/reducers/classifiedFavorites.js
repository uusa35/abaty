import {
  SET_CLASSIFIED_FAVORITES,
  GET_CLASSIFIED_FAVORITES,
} from '../actions/types';

export default function (classifiedFavorites = [], action) {
  switch (action.type) {
    case SET_CLASSIFIED_FAVORITES:
      return action.payload;
    case GET_CLASSIFIED_FAVORITES:
      return action.payload;
    default:
      return classifiedFavorites;
  }
}
