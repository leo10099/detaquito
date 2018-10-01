import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';
import { Card, Button } from '../../../Elements/';
import { colors } from '../../../Utilities';

import './SingleView.styl';

export default class SingleView extends Component {
  static propTypes = {
    currentGame: PropTypes.number.isRequired,
    incrementCurrentGame: PropTypes.func.isRequired,
    decrementCurrentGame: PropTypes.func.isRequired,
    predictions: PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.object),
      PropTypes.array
    ]),
    matches: PropTypes.array.isRequired,
    Prediction: PropTypes.func,
    uploading: PropTypes.bool.isRequired
  };

  homeInput = React.createRef();
  awayInput = React.createRef();

  constructResultObj = () => {
    const { value: home_goals } = this.homeInput.current;
    const { value: away_goals } = this.awayInput.current;
    const { _id: home_team } = this.props.matches[
      this.props.currentGame
    ].home_team;
    const { _id: away_team } = this.props.matches[
      this.props.currentGame
    ].away_team;

    const prediction = {
      home_team,
      away_team,
      home_goals,
      away_goals
    };

    return prediction;
  };

  buttonClickHandler = event => {
    if (event.target.name === 'prevButton') {
      this.props.decrementCurrentGame();
      const prediction = this.constructResultObj();
      this.props.pushPrediction(prediction);
      this.homeInput.current.value = '0';
      this.awayInput.current.value = '0';

      return;
    }
    if (event.target.name === 'nextButton') {
      this.props.incrementCurrentGame();
      const prediction = this.constructResultObj();
      this.props.pushPrediction(prediction);
      this.homeInput.current.value = '0';
      this.awayInput.current.value = '0';

      return;
    }

    if (event.target.name === 'saveSingleViewButton') {
      const prediction = this.constructResultObj();
      this.props.pushPrediction(prediction, { upload: true });
    }
  };

  arrowClickHandler = event => {
    if (event.target.id === 'homeTeamArrowUp') {
      // Pasar a número para poder sumarlo
      const oldValue = Number(this.homeInput.current.value);
      // Si no se llegó a 10 goles, sumar y guardar en el input el nuevo valor
      const newValue = oldValue + 1;
      if (newValue < 10) {
        this.homeInput.current.value = newValue;
      }
    }
    if (event.target.id === 'awayTeamArrowUp') {
      const oldValue = Number(this.awayInput.current.value);
      const newValue = oldValue + 1;
      if (newValue < 10) {
        this.awayInput.current.value = newValue;
      }
    }
    if (event.target.id === 'homeTeamArrowDown') {
      if (this.homeInput.current.value > 0) {
        this.homeInput.current.value -= 1;
      }
    }
    if (event.target.id === 'awayTeamArrowDown') {
      if (this.awayInput.current.value > 0) {
        this.awayInput.current.value -= 1;
      }
    }
  };

  render() {
    const { currentGame, matches, predictions, uploading } = this.props;
    const {
      buttonClickHandler,
      arrowClickHandler,
      homeInput,
      awayInput
    } = this;

    return (
      <section className="predict__single-view__container">
        <Card className="no-padding" style={{ opacity: 0.9 }}>
          <div className="predict__single-view__content">
            <section className="predict__single-view__content__body">
              <span className="local">LOCAL</span>
              <span className="visitante">VISITANTE</span>

              <div className="homeTeamGroup">
                <img
                  src={`/static/img/clubes/${
                    matches[currentGame].home_team.logo
                  }`}
                  className="badge badge-shadow"
                  alt={matches[currentGame].home_team.name}
                />
                <span className="homeTeamGroup__name">
                  {matches[currentGame].home_team.name}
                </span>
              </div>
              <div className="awayTeamGroup">
                <img
                  src={`/static/img/clubes/${
                    matches[currentGame].away_team.logo
                  }`}
                  className="badge badge-shadow"
                  alt={matches[currentGame].away_team.name}
                />
                <span className="awayTeamGroup__name">
                  {matches[currentGame].away_team.name}
                </span>
              </div>

              <h3 className="predict__single-view__content__body__vs">VS</h3>

              <div className="homeInputGroup">
                <i
                  id="homeTeamArrowDown"
                  className="fa fa-angle-down moveDown"
                  onClick={arrowClickHandler}
                />
                <input
                  type="text"
                  maxLength="1"
                  defaultValue={
                    predictions[currentGame]
                      ? predictions[currentGame].home_goals
                      : '0'
                  }
                  key={
                    predictions[currentGame]
                      ? predictions[currentGame].home_goals
                      : null
                  }
                  ref={homeInput}
                />
                <i
                  id="homeTeamArrowUp"
                  className="fa fa-angle-up moveUp"
                  onClick={arrowClickHandler}
                />
              </div>
              <div className="awayInputGroup">
                <i
                  id="awayTeamArrowDown"
                  className="fa fa-angle-down moveDown"
                  onClick={arrowClickHandler}
                />
                <input
                  type="text"
                  maxLength="1"
                  defaultValue={
                    predictions[currentGame]
                      ? predictions[currentGame].away_goals
                      : '0'
                  }
                  key={
                    predictions[currentGame]
                      ? predictions[currentGame].away_goals
                      : null
                  }
                  ref={awayInput}
                />
                <i
                  id="awayTeamArrowUp"
                  className="fa fa-angle-up moveUp"
                  onClick={arrowClickHandler}
                />
              </div>
            </section>

            <section
              className="predict__single-view__content__footer"
              onClick={buttonClickHandler}
            >
              <Button
                display={currentGame > 0 ? 'initial' : 'none'}
                name="prevButton"
              >
                <i className="fa fa-angle-left button-icon" />
                &nbsp; Anterior
              </Button>
              <span>Nº {currentGame + 1}</span>

              {/* Si se llega al final de los partidos, mostrar el botón Guardar */}

              {matches.length - 1 !== currentGame ? (
                <Button name="nextButton">
                  Siguiente &nbsp;
                  <i
                    className={
                      matches.length - 1 !== currentGame &&
                      'fa fa-angle-right button-icon'
                    }
                  />
                </Button>
              ) : (
                <Button name="saveSingleViewButton">
                  {uploading ? (
                    <PulseLoader
                      sizeUnit="rem"
                      color={colors.dark}
                      size={0.5}
                    />
                  ) : (
                    'Guardar'
                  )}
                </Button>
              )}
            </section>
          </div>
        </Card>
      </section>
    );
  }
}
