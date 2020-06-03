import {
  SHOW_CLASSIFIED_FILTER_MODAL,
  HIDE_CLASSIFIED_FILTER_MODAL,
} from '../actions/types';

export default function (classifiedFilterModal = false, action) {
  switch (action.type) {
    case SHOW_CLASSIFIED_FILTER_MODAL:
      return true;
    case HIDE_CLASSIFIED_FILTER_MODAL:
      return false;
    default:
      return classifiedFilterModal;
  }
}
