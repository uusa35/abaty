import {SHOW_SEARCH_MODAL, HIDE_SEARCH_MODAL} from '../actions/types';

export default function (searchModal = false, action) {
  switch (action.type) {
    case SHOW_SEARCH_MODAL:
      return true;
    case HIDE_SEARCH_MODAL:
      return false;
    default:
      return searchModal;
  }
}
