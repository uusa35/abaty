import {LINK_NOTIFICATION} from '../actions/types';

export default function(notification = {}, action) {
  switch (action.type) {
    case LINK_NOTIFICATION:
      return action.payload;
    default:
      return notification;
  }
}
