import {SET_SETTINGS} from '../actions/types';

export default function(settings = {}, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return action.payload;
    default:
      return settings;
  }
}
