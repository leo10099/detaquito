import { FETCH_ROUND_DATA } from '../actions/round';

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ROUND_DATA:
      return payload.data.data;
    default:
      return state;
  }
}
