import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/auth/current');
  return dispatch({ type: FETCH_USER, payload: response.data });
};
