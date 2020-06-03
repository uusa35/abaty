import {SET_SLIDES, SET_HOME_SLIDERS} from '../actions/types';

export default function (slides = [], action) {
  switch (action.type) {
    case SET_HOME_SLIDERS:
      return action.payload;
    default:
      return slides;
  }
}
