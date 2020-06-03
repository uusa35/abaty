import {SET_NOTIFICATIONS, GET_NOTIFICATIONS} from '../actions/types';

export default function (notifications = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload;
    case GET_NOTIFICATIONS:
      return notifications;
    default:
      return notifications;
  }
}
