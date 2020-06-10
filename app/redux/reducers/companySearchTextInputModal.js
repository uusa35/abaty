import {TOGGLE_COMPANY_SEARCH_TEXT_INPUT_MODAL} from '../actions/types';

export default function (companySearchTextInputModal = false, action) {
  switch (action.type) {
    case TOGGLE_COMPANY_SEARCH_TEXT_INPUT_MODAL:
      return action.payload;
    default:
      return companySearchTextInputModal;
  }
}
