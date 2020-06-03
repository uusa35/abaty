import {SET_VIDEO} from '../actions/types';

export default function (video = {}, action) {
  switch (action.type) {
    case SET_VIDEO:
      return action.payload;
    default:
      return video;
  }
}
