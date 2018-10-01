import { FETCH_ALL_TEAMS_NAMES } from '../actions/team';

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_TEAMS_NAMES:
      return payload;
    default:
      return state;
  }
}
