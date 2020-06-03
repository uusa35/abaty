import {TOGGLE_LOADING_CONTENT} from '../actions/types';

export default function (isLoadingContent = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING_CONTENT:
      return action.payload;
    default:
      return isLoadingContent;
  }
}
