import {SET_HOME_CATEGORIES} from '../actions/types';

export default function (homeCategories = [], action) {
  switch (action.type) {
    case SET_HOME_CATEGORIES:
      return action.payload;
    default:
      return homeCategories;
  }
}
