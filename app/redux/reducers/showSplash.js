import {TOGGLE_SPLASH} from '../actions/types';

export default function (showSplash = true, action) {
  switch (action.type) {
    case TOGGLE_SPLASH:
      return action.payload;
    default:
      return showSplash;
  }
}
