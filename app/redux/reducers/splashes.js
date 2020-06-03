import {SET_HOME_SPLASHES} from '../actions/types';

export default function (splashes = [], action) {
  switch (action.type) {
    case SET_HOME_SPLASHES:
      return action.payload;
    default:
      return splashes;
  }
}
