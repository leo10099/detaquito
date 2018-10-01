import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import { Card } from '../../Elements/';
import { colors } from '../../Utilities';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';

import './Results.styl';

export class Result extends Component {
  async componentDidMount() {
    await this.setState({ currentRound: this.props.conf.round - 1 });
    const matches = await axios.get(
      `/api/fetch/round/played/${this.state.currentRound}`
    );
    await this.setState({ matches: matches.data });
    const predictionsResponse = await axios.get(
      `/api/fetch/prediction/${this.state.currentRound}`
    );
    if (predictionsResponse.data.data) {
      const { predictions } = predictionsResponse.data.data;
      await this.setState({ predictions });
    }
    const scores = await axios.get(
      `/api/fetch/scores/${this.state.currentRound}/`
    );

    await this.setState({ scores: { ...this.state.scores, ...scores.data } });
    this.setState({ isLoading: false });
  }

  state = {
    currentRound: 0,
    matches: [],
    predictions: [],
    scores: {},
    isLoading: true
  };

  render() {
    const {
      currentRound,
      matches,
      predictions,
      scores,
      isLoading
    } = this.state;

    if (isLoading) {
      return (
        <div className="loading-container">
          <PulseLoader sizeUnit="rem" color={colors.white} size={1} />
        </div>
      );
    }

    if (!matches.length || !predictions.length || !scores.detail) {
      return (
        <section id="Results">
          <h1 className="dashboard__title">Mis Resultados</h1>
          <p className="dashboard__lead">
            Si pronosticate la fecha anterior, enterate acá cuánto sumaste por
            cada partido
          </p>
        </section>
      );
    }

    return (
      <section id="Results">
        <h1 className="dashboard__title">Mis Resultados</h1>
        <p className="dashboard__results__subtitle ">
          Enterate cuánto sumaste por cada partido en la fecha anterior
        </p>
        <div className="dashboard__results__total-points">
          FECHA:{' '}
          <span className="dashboard__results__points">{currentRound}</span>{' '}
          &nbsp; PUNTOS:
          <span className="dashboard__results__points"> {scores.total} </span>
        </div>
        <Card className="dashboard__results__Card">
          <div className="dashboard__results__h-container">PARTIDO</div>
          <div className="dashboard__results__h-container">RESULTADO</div>
          <div className="dashboard__results__h-container">PRONOSTICASTE</div>
          <div className="dashboard__results__h-container">PUNTOS</div>

          {matches.map((match, index) => {
            return (
              <Fragment key={match._id}>
                <div className="dashboard__results__item-container">
                  {match.home_team.name} - {match.away_team.name}
                </div>
                <div className="dashboard__results__item-container">
                  {predictions[index].home_goals} -
                  {predictions[index].away_goals}
                </div>
                <div className="dashboard__results__item-container">
                  {match.home_goals} - {match.away_goals}
                </div>
                <div className="dashboard__results__item-container">
                  {scores.detail[index] === 10 && ' 🔥 '}
                  {scores.detail[index] ? scores.detail[index] : '-'}
                  {scores.detail[index] === 10 && ' 🔥 '}
                </div>
              </Fragment>
            );
          })}
        </Card>
      </section>
    );
  }
}

const mapStateToProps = ({ conf, round }) => {
  return { conf, round };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { mapDispatchToProps }
)(Result);
