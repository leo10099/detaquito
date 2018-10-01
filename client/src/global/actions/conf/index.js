import axios from 'axios';

export const FETCH_ROUND_CONFIG = 'FETCH_ROUND_CONFIG';

export const fetchRoundConfig = () => async dispatch => {
  const response = await axios.get('/api/fetch/config/round');
  return dispatch({ type: FETCH_ROUND_CONFIG, payload: response });
};
