import {SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL} from '../actions/types';

export default function (loginModal = false, action) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return true;
    case HIDE_LOGIN_MODAL:
      return false;
    default:
      return loginModal;
  }
}
