import {SET_CLASSIFIEDS} from '../actions/types';

export default function (classifieds = [], action) {
  switch (action.type) {
    case SET_CLASSIFIEDS:
      return action.payload;
    default:
      return classifieds;
  }
}
