import {SET_COMPANY} from '../actions/types';

export default function (company = {}, action) {
  switch (action.type) {
    case SET_COMPANY:
      return action.payload;
    default:
      return company;
  }
}
