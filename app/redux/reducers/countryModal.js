import {SHOW_COUNTRY_MODAL, HIDE_COUNTRY_MODAL} from '../actions/types';

export default function(countryModal = false, action) {
  switch (action.type) {
    case SHOW_COUNTRY_MODAL:
      return action.payload;
    case HIDE_COUNTRY_MODAL:
      return action.payload;
    default:
      return countryModal;
  }
}
