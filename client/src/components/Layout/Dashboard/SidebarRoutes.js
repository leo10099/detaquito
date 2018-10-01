import React from 'react';

// Componentes de Dashboard

import Start from './Start';
import Predict from '../Predict/';
import Results from '../Results/';
import TournamentsHome from '../Tourneys/';
import TournamentsNew from '../Tourneys/NewTourney/';
import TournamentsJoin from '../Tourneys/JoinTourney/';
import TournamentsSingle from '../Tourneys/SingleTourney';
import TournamentsAdmin from '../Tourneys/AdminTourney';

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
    path: '/admin/:tourney',
    main: props => <TournamentsAdmin {...props} />,
    exact: true
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
    main: props => <TournamentsNew {...props} />,
    exact: true
  },
  {
    path: '/joinTourney',
    main: props => <TournamentsJoin {...props} />,
    exact: true
  }
];

export default sidebar;
