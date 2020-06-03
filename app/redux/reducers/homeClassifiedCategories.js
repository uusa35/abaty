import {SET_HOME_CLASSIFIED_CATEGORIES} from '../actions/types';

export default function (homeClassifiedCategories = [], action) {
  switch (action.type) {
    case SET_HOME_CLASSIFIED_CATEGORIES:
      return action.payload;
    default:
      return homeClassifiedCategories;
  }
}
