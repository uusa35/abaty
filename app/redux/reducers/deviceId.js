import {SET_DEVICE_ID} from '../actions/types';

export default function (deviceId = '', action) {
  switch (action.type) {
    case SET_DEVICE_ID:
      return action.payload;
    default:
      return deviceId;
  }
}
