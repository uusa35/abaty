import {SET_HOME_SERVICES} from '../actions/types';

export default function (homeServices = [], action) {
  switch (action.type) {
    case SET_HOME_SERVICES:
      return action.payload;
    default:
      return homeServices;
  }
}
