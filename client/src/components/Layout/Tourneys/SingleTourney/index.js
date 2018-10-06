import React, { Component, Fragment } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { colors } from "../../../Utilities";
import { Card } from "../../../Elements";
import axios from "axios";

import TotalPoints from "./TourneyTotalPoints";
import LastRoundPoints from "./TourneyLastRound";

import "./singleTourney.styl";

class SingleTourney extends Component {
  componentDidMount() {}

  render() {
    const _id = this.props.match.params.tourney;
    return (
      <Router>
        <section className="Single__Tourney">
          <h1 className="dashboard__title">Mis Torneos</h1>
          <h3 className="dashboard__subtitle">Nombre del torneo</h3>
          <nav className="Single__Tourney__nav">
            <Link to={`/tournament/${_id}/totalpoints/`}>Total</Link>
            <span className="text-secondary"> || </span>
            <Link to={`/tournament/${_id}/lastroundpoints/`}>Última Fecha</Link>
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
)(SingleTourney);
