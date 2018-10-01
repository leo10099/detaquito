import { combineReducers } from 'redux';

// Import all reducers
import auth from './global/reducers/authReducer';
import team from './global/reducers/teamReducer';
import conf from './global/reducers/confReducer';
import round from './global/reducers/roundReducer';

const rootReducer = combineReducers({
  auth,
  team,
  conf,
  round
});

export default rootReducer;
