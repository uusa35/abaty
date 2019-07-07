import {ENABLE_MESSAGE, DISABLE_MESSAGE} from '../actions/types';

export default function(message = {content: ''}, action) {
  switch (action.type) {
    case ENABLE_MESSAGE:
      return action.payload;
    case DISABLE_MESSAGE:
      return {content: ''};
    default:
      return message;
  }
}
