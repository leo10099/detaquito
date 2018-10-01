import React from 'react';

// Componentes de Dashboard

import Start from './Start';
import Predict from '../Predict/';
import Results from '../Results/';
import TournamentsHome from '../Tourneys/';
import TournamentsNew from '../Tourneys/NewTourney/';
import TournamentsJoin from '../Tourneys/JoinTourney/';
import TournamentsSingle from '../Tourneys/SingleTourney';

const sidebar = [
  {
    path: '/dashboard',
    main: props => <Start {...props} />
  },
  {
    path: '/predict',
    main: props => <Predict {...props} />
  },
  {
    path: '/results',
    main: props => <Results {...props} />
  },
  {
    path: '/rankings',
    main: () => <h2>Rankings</h2>
  },
  {
    path: '/tournament/:tourney',
    main: props => <TournamentsSingle {...props} />,
    exact: true
  },
  {
    path: '/tournaments',
    main: props => <TournamentsHome {...props} />,
    exact: true
  },
  {
    path: '/newTourney',
    main: props => <TournamentsNew {...props} />
  },
  {
    path: '/joinTourney',
    main: props => <TournamentsJoin {...props} />
  }
];

export default sidebar;
