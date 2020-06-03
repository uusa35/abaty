import {SHOW_AREA_MODAL, HIDE_AREA_MODAL} from '../actions/types';

export default function (areaModal = false, action) {
  switch (action.type) {
    case SHOW_AREA_MODAL:
      return true;
    case HIDE_AREA_MODAL:
      return false;
    default:
      return areaModal;
  }
}
