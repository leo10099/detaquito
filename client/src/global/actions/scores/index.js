import axios from 'axios';

export const FETCH_USER_SCORES = 'FETCH_USER_SCORES';

export const fetchUserResults = round => async dispatch => {
  const response = await axios.get(`/api/fetch/scores/${round}/${user}`);
  return dispatch({ type: FETCH_ROUND_DATA, payload: response });
};
