import {SET_HOME_DESIGNERS} from '../actions/types';

export default function (homeDesigners = [], action) {
  switch (action.type) {
    case SET_HOME_DESIGNERS:
      return action.payload;
    default:
      return homeDesigners;
  }
}
