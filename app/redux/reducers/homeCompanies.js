import {SET_HOME_COMPANIES} from '../actions/types';

export default function (homeCompanies = [], action) {
  switch (action.type) {
    case SET_HOME_COMPANIES:
      return action.payload;
    default:
      return homeCompanies;
  }
}
