import {SHOW_COUNTRY_MODAL, HIDE_COUNTRY_MODAL} from '../actions/types';

export default function (countryModal = false, action) {
  switch (action.type) {
    case SHOW_COUNTRY_MODAL:
      return true;
    case HIDE_COUNTRY_MODAL:
      return false;
    default:
      return false;
  }
}
