import {SHOW_INTRODUCTION, HIDE_INTRODUCTION} from '../actions/types';

export default function(showIntroduction = true, action) {
  switch (action.type) {
    case SHOW_INTRODUCTION:
      return true;
    case HIDE_INTRODUCTION:
      return false;
    default:
      return showIntroduction;
  }
}
