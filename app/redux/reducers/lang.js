import {CHANGE_LANG, SET_LANG} from '../actions/types';

export default function(lang = 'en', action) {
  switch (action.type) {
    case CHANGE_LANG:
      return action.payload;
    case SET_LANG:
      return action.payload;
    default:
      return lang;
  }
}
