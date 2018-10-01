import axios from 'axios';

export const FETCH_ROUND_DATA = 'FETCH_ROUND_DATA';

export const fetchRoundData = round => async dispatch => {
  const response = await axios.get(`/api/fetch/round/${round}`);
  return dispatch({ type: FETCH_ROUND_DATA, payload: response });
};
