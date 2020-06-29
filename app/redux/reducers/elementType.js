import {SET_ELEMENT_TYPE} from '../actions/types';

export default function (elementType = '', action) {
  switch (action.type) {
    case SET_ELEMENT_TYPE:
      return action.payload;
    default:
      return elementType;
  }
}
