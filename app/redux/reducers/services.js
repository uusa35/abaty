import {SET_SERVICES} from '../actions/types';

export default function (services = [], action) {
  switch (action.type) {
    case SET_SERVICES:
      return action.payload;
    default:
      return services;
  }
}
