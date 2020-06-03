import {HIDE_PROPERTIES_MODAL, SHOW_PROPERTIES_MODAL} from '../actions/types';

export default function (propertiesModal = false, action) {
  switch (action.type) {
    case SHOW_PROPERTIES_MODAL:
      return true;
    case HIDE_PROPERTIES_MODAL:
      return false;
    default:
      return propertiesModal;
  }
}
