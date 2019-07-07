import {GET_PLAYER_ID, SET_PLAYER_ID} from '../actions/types';

export default function(playerId = '', action) {
  switch (action.type) {
    case GET_PLAYER_ID:
      return action.payload;
    case SET_PLAYER_ID:
      return action.payload;
    default:
      return playerId;
  }
}
