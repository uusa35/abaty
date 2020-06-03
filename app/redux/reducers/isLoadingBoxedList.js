import {TOGGLE_LOADING_BOXED_LIST} from '../actions/types';

export default function (isLoadingBoxedList = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING_BOXED_LIST:
      return action.payload;
    default:
      return isLoadingBoxedList;
  }
}
