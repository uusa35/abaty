import {SET_VIDEOS} from '../actions/types';

export default function (videos = [], action) {
  switch (action.type) {
    case SET_VIDEOS:
      return action.payload;
    default:
      return videos;
  }
}
