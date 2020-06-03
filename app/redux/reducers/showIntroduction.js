import {TOGGLE_INTRODUCTION} from '../actions/types';

export default function (showIntroduction = true, action) {
  switch (action.type) {
    case TOGGLE_INTRODUCTION:
      return action.payload;
    default:
      return showIntroduction;
  }
}
