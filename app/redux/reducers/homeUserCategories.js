import {SET_HOME_USER_CATEGORIES} from '../actions/types';

export default function (homeUserCategories = [], action) {
  switch (action.type) {
    case SET_HOME_USER_CATEGORIES:
      return action.payload;
    default:
      return homeUserCategories;
  }
}
