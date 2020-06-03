import {SET_COMPANIES} from '../actions/types';

export default function (companies = [], action) {
  switch (action.type) {
    case SET_COMPANIES:
      return action.payload;
    default:
      return companies;
  }
}
