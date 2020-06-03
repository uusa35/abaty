import {SET_HOME_CLASSIFIEDS, GET_HOME_CLASSIFIEDS} from '../actions/types';

export default function (homeClassifieds = [], action) {
  switch (action.type) {
    case SET_HOME_CLASSIFIEDS:
      return action.payload;
    case GET_HOME_CLASSIFIEDS:
      return [];
    default:
      return homeClassifieds;
  }
}
