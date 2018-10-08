import React, { Component } from 'react';
import {
  withRouter,
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../../../Utilities';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import TotalPoints from './TourneyTotalPoints';
import LastRoundPoints from './TourneyLastRound';

import './singleTourney.styl';

class SingleTourney extends Component {
  state = {
    showLastRound: true
  };

  componentDidMount() {
    axios
      .get(`/api/fetch/tourney/${this.props.match.params.tourney}/`)
      .then(response => {
        this.setState({ tourneyName: response.data.tourney.name });
      });
  }

  render() {
    const _id = this.props.match.params.tourney;
    const { tourneyName } = this.state;
    if (!tourneyName) {
      return (
        <div className="loading-container">
          <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />;
        </div>
      );
    }
    return (
      <Router>
        <section className="Single__Tourney">
          <h1 className="dashboard__title">Mis Torneos</h1>
          <h3 className="dashboard__subtitle">{tourneyName}</h3>
          <nav className="Single__Tourney__nav">
            <Link
              to={`/tournament/${_id}/totalpoints/`}
              onClick={() => {
                this.setState({ showLastRound: false });
              }}
              style={
                this.state.showLastRound
                  ? { colors: colors.secondary }
                  : { color: 'whitesmoke' }
              }
            >
              <i className="fa fa-list-ol baseline" />
              &nbsp; Tabla de Posiciones
            </Link>
            <span className="text-white Single__Tourney__separator"> || </span>
            <Link
              to={`/tournament/${_id}/lastroundpoints/`}
              onClick={() => {
                this.setState({ showLastRound: true });
              }}
              style={
                this.state.showLastRound
                  ? { color: 'whitesmoke' }
                  : { colors: colors.secondary }
              }
            >
              <i className="fa fa-calendar-alt baseline" /> &nbsp; Última Fecha
            </Link>
          </nav>
          <Route
            path="/tournament/:_id/totalpoints/"
            component={TotalPoints}
            exact
          />
          <Route
            component={LastRoundPoints}
            path="/tournament/:_id/lastroundpoints/"
            exact
          />
        </section>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(SingleTourney));
