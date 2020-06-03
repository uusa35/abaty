import {TOGGLE_LOADING_PROFILE} from '../actions/types';

export default function (isLoadingProfile = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING_PROFILE:
      return action.payload;
    default:
      return isLoadingProfile;
  }
}
