import {ENABLE_MESSAGE, DISABLE_MESSAGE} from '../actions/types';

export default function (message = {content: '', visible: false}, action) {
  switch (action.type) {
    case ENABLE_MESSAGE:
      return action.payload;
    case DISABLE_MESSAGE:
      return {content: '', visible: false};
    default:
      return message;
  }
}
