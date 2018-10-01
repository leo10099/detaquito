import axios from 'axios';

export const FETCH_ALL_TEAMS_NAMES = 'FETCH_ALL_TEAMS_NAMES';

export const fetchAllTeamsNames = () => async dispatch => {
  const response = await axios.get('/api/fetch/team/names');
  dispatch({ type: FETCH_ALL_TEAMS_NAMES, payload: response.data.data });
};
