import { FETCH_ROUND_CONFIG } from '../actions/conf';

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ROUND_CONFIG:
      return payload.data;
    default:
      return state;
  }
}
