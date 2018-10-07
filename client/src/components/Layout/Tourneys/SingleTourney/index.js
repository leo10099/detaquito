import React, { Component, Fragment } from "react";
import {
  withRouter,
  Link,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { colors } from "../../../Utilities";
import { Card } from "../../../Elements";
import axios from "axios";

import TotalPoints from "./TourneyTotalPoints";
import LastRoundPoints from "./TourneyLastRound";

import "./singleTourney.styl";

class SingleTourney extends Component {
  state = {
    showLastRound: true
  };
  render() {
    const _id = this.props.match.params.tourney;
    const { pathname } = this.props.location;

    return (
      <Router>
        <section className="Single__Tourney">
          <h1 className="dashboard__title">Mis Torneos</h1>
          <h3 className="dashboard__subtitle">Nombre del torneo</h3>
          <nav className="Single__Tourney__nav">
            <Link
              to={`/tournament/${_id}/totalpoints/`}
              onClick={() => {
                this.setState({ showLastRound: false });
              }}
              style={
                this.state.showLastRound
                  ? { colors: colors.secondary }
                  : { color: "whitesmoke" }
              }
            >
              <i className="fa fa-list-ol baseline" />
              &nbsp; Tabla de Posiciones
            </Link>
            <span className="text-white"> || </span>
            <Link
              to={`/tournament/${_id}/lastroundpoints/`}
              onClick={() => {
                this.setState({ showLastRound: true });
              }}
              style={
                this.state.showLastRound
                  ? { color: "whitesmoke" }
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
            path="/tournament/:_id/lastroundpoints/"
            component={LastRoundPoints}
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
