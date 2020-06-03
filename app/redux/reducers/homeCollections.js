import {SET_HOME_COLLECTIONS} from '../actions/types';

export default function (homeCollections = [], action) {
  switch (action.type) {
    case SET_HOME_COLLECTIONS:
      return action.payload;
    default:
      return homeCollections;
  }
}
