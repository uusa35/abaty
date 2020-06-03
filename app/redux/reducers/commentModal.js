import {SHOW_COMMENT_MODAL, HIDE_COMMENT_MODAL} from '../actions/types';

export default function (commentModal = false, action) {
  switch (action.type) {
    case SHOW_COMMENT_MODAL:
      return true;
    case HIDE_COMMENT_MODAL:
      return false;
    default:
      return commentModal;
  }
}
