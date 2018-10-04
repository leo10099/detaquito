import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { colors } from '../../../Utilities';
import { Card } from '../../../Elements';

// import PropTypes from 'prop-types';
import axios from 'axios';

import './SingleTourney.styl';

class SingleTourney extends Component {
  componentDidMount = async () => {
    await this.fetchTourneyDetails();
    // Encontrar las fechas que se van a competir en el Torneo y armar un array con ese rango
    const rounds_to_compute = this.roundsToCompute(
      25,
      this.state.t.start_on_round,
      this.props.conf.round
    );
    // Traer todos los resultados de los miembros dentro de las fechas que se disputa este Torneo
    rounds_to_compute.map(round => {
      this.state.t.users.map(user => {
        axios.get(`/api/fetch/scores/${round}/${user._id}`).then(response => {
          this.setState({
            member_scores: [...this.state.member_scores, response.data]
          });
        });
      });
    });
  };

  state = {
    t: null,
    member_scores: []
  };

  roundsToCompute(total_rounds, start_on_round, current_round) {
    let rounds_to_compute = [...Array(total_rounds).keys()];
    return rounds_to_compute.slice(start_on_round, current_round);
  }

  async fetchTourneyDetails() {
    const _id = this.props.match.params.tourney;

    const tourney = await axios.get(`/api/fetch/tourney/${_id}`);
    this.setState({ t: tourney.data.tourney });
  }

  render() {
    const { t } = this.state;
    return (
      <section className="Single__Tourney">
        <h1 className="dashboard__title">Mis Torneos</h1>
        {t ? (
          <Fragment>
            <h3 className="dashboard__subtitle">{t.name}</h3>
            <section className="Single__Tourney__Details">
              <Card style={{ opacity: 0.9 }}>HOLA</Card>
            </section>
          </Fragment>
        ) : (
          <div className="loading-container">
            <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
          </div>
        )}
      </section>
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
