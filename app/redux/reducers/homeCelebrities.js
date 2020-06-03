import {SET_HOME_CELEBRITIES} from '../actions/types';

export default function (homeCelebrities = [], action) {
  switch (action.type) {
    case SET_HOME_CELEBRITIES:
      return action.payload;
    default:
      return homeCelebrities;
  }
}
