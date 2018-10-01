import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import './index.styl';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar componentes
import requireAuth from './components/Shared/RequireLogin/';

import Home from './components/Layout/Home';
import Login from './components/Layout/Login';
import Account from './components/Layout/Account';
import Info from './components/Layout/Info';
import Dashboard from './components/Layout/Dashboard';

// Creating Redux Store
const middleware = [logger, thunk];
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/account" component={Account} exact />
        <Route path="/info" component={Info} exact />
        <Route path="/dashboard" component={requireAuth(Dashboard)} exact />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
