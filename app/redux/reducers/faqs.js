import {SET_FAQS} from '../actions/types';

export default function (faqs = [], action) {
  switch (action.type) {
    case SET_FAQS:
      return action.payload;
    default:
      return faqs;
  }
}
