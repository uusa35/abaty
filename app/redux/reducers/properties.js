import {SET_PROPERTIES, CLEAR_PROPERTIES} from '../actions/types';

export default function(properties = [], action) {
  switch (action.type) {
    case SET_PROPERTIES:
      return action.payload;
    case CLEAR_PROPERTIES:
      return [];
    default:
      return properties;
  }
}
