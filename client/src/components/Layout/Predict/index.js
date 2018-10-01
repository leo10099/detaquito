import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRoundConfig } from '../../../global/actions/conf/';
import { fetchRoundData } from '../../../global/actions/round/';
import { PulseLoader } from 'react-spinners';
import { colors } from '../../Utilities';
import axios from 'axios';
import toastr from 'toastr';

import SingleView from './SingleView/';

import './Predict.styl';

class Predict extends Component {
  static propTypes = {
    conf: PropTypes.object,
    auth: PropTypes.object.isRequired
  };

  async componentDidMount() {
    await this.props.fetchRoundConfig();
    await this.props.fetchRoundData(this.props.conf.round);

    const recoverUserPredictions = await axios.get(
      `/api/fetch/prediction/${this.props.conf.round}`
    );
    if (recoverUserPredictions.data.data) {
      const { predictions } = recoverUserPredictions.data.data;

      this.setState({
        predictions: { ...this.state.predictions, ...predictions }
      });
    }
  }

  state = {
    currentGame: 0,
    predictions: [],
    uploading: false
  };

  incrementCurrentGame = () => {
    this.setState({ currentGame: this.state.currentGame + 1 });
  };
  decrementCurrentGame = () => {
    this.setState({ currentGame: this.state.currentGame - 1 });
  };

  pushPrediction = (prediction, uploadFlag) => {
    const newPrediction = { [this.state.currentGame]: prediction };
    this.setState(
      {
        predictions: { ...this.state.predictions, ...newPrediction }
      },
      uploadFlag ? () => this.saveUserPredictions() : null
    );
  };

  saveUserPredictions = () => {
    this.setState({ uploading: true }, () =>
      this.uploadUserPredictions(this.state.predictions, this.props.conf.round)
    );
  };

  uploadUserPredictions = async (predictions, round) => {
    // Guardar el pronóstico en la base de datos
    const response = await axios.post('/api/create/prediction/', {
      predictions,
      round
    });
    // Tomar el ID devuelto del pronóstico y guararlo en la lista de pronósticos de la fecha actual
    await axios
      .patch('/api/update/round/', {
        id: response.data.newPrediction._id,
        round: this.props.round
      })
      .then(toastr.success('Se guardaron exitosamente tus pronósticos'))
      .catch(e =>
        toastr.error(
          'Hubo un error al guardar tus pronósticos. Por favor, intentá más tarde'
        )
      );
    this.setState({ uploading: false });
  };

  render() {
    const { round, conf, auth } = this.props;
    const { currentGame, predictions, uploading } = this.state;
    const { incrementCurrentGame, decrementCurrentGame, pushPrediction } = this;

    return auth && conf && round ? (
      <section id="Predict">
        <div className="prediction__header">
          <h1 className="dashboard__title">Pronosticar</h1>
          <h3 className="dashboard__subtitle">Fecha {conf.round}</h3>
        </div>
        <SingleView
          currentGame={currentGame}
          incrementCurrentGame={incrementCurrentGame}
          decrementCurrentGame={decrementCurrentGame}
          matches={round.matches}
          predictions={predictions}
          pushPrediction={pushPrediction}
          uploading={uploading}
        />
      </section>
    ) : (
      <div className="loading-container">
        <PulseLoader
          color={colors.white}
          sizeUnit="rem"
          size={0.8}
          className="account__loader"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ round, conf }) => {
  return { round, conf };
};

export default connect(
  mapStateToProps,
  { fetchRoundData, fetchRoundConfig }
)(Predict);
