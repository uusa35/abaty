import {SET_SERVICE} from '../actions/types';

export default function (service = {}, action) {
  switch (action.type) {
    case SET_SERVICE:
      return action.payload;
    default:
      return service;
  }
}
