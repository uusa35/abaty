import {SHOW_CURRENCY_MODAL, HIDE_CURRENCY_MODAL} from '../actions/types';

export default function (currencyModal = false, action) {
  switch (action.type) {
    case SHOW_CURRENCY_MODAL:
      return true;
    case HIDE_CURRENCY_MODAL:
      return false;
    default:
      return false;
  }
}
