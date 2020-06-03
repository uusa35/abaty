import {
  SHOW_PRODUCT_FILTER_MODAL,
  HIDE_PRODUCT_FILTER_MODAL,
} from '../actions/types';

export default function (productFilterModal = false, action) {
  switch (action.type) {
    case SHOW_PRODUCT_FILTER_MODAL:
      return true;
    case HIDE_PRODUCT_FILTER_MODAL:
      return false;
    default:
      return productFilterModal;
  }
}
