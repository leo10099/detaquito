import React, { Component } from 'react';
import Button from '../../../Elements/Button';
import { colors } from '../../../Utilities';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

import './NewTourney.styl';

export default class NewTourney extends Component {
  state = {
    isUploading: false,
    constinue: false,
    newT: ''
  };

  handleSubmit = event => {
    this.setState({ isUploading: true });
    event.preventDefault();

    axios
      .post('/api/create/tourney/', {
        name: event.target.name.value,
        start_on_round: event.target.start_on_round.value
      })
      .then(async response => {
        await this.setState({ isUploading: false });
        await this.setState({ newT: response.data.data });
        await this.setState({ continue: true });
      })
      .catch(e => {
        toastr.error(
          'Hubo un error al guardar el Torneo. Intentá más tarde, por favor.'
        );
        this.setState({ isUploading: false });
      });
  };

  getNext3Rounds = baseRound => {
    const times = [1, 2, 3];
    let jsx = times.map(time => {
      if (baseRound + time < 26) {
        return (
          <option value={baseRound + time} key={time}>
            Fecha {baseRound + time}
          </option>
        );
      }
    });
    return jsx;
  };

  render() {
    const { isUploading, newT } = this.state;
    if (!this.state.continue) {
      return (
        <section className="Tourney__New">
          <h1 className="dashboard__title">CREAR TORNEO</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="Tourney__New__form">
              <div className="form-group">
                <label htmlFor="name" className="label-inline text-white">
                  <strong>Nombre del Torneo</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="Tourney__New__input"
                  minLength="4"
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="startOnRound"
                  className="label-inline text-white"
                >
                  <strong>Comenzar Competición</strong>
                </label>
                <select
                  className="text-white"
                  id="startOnRound"
                  name="start_on_round"
                >
                  <option value={this.props.conf.round}>
                    La próxima fecha
                  </option>
                  {this.getNext3Rounds(this.props.conf.round + 1).map(
                    element => element
                  )}
                </select>
              </div>
            </div>
            <div className="Tourney__New__Button-panel">
              <Button backgroundColor={colors.primary} textColor={colors.white}>
                {isUploading ? (
                  <PulseLoader sizeUnit="rem" color={'whitesmoke'} size={0.5} />
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <section className="Tourney__New">
          <h1 className="dashboard__title">CREAR TORNEO</h1>
          <h4 className="text-white Tourney__New__feedback">
            Se creó correctamente tu torneo. <br />
            Para que otros usuarios de De Taquito puedan unirse, pasales el
            siguiente número de Torneo: &nbsp;
            <span className="text-secondary">{newT.number}</span>
            <br />
            <Link to={`/tournament/:${newT._id}/`}>
              Ver <i className="fa fa-arrow-right" />
            </Link>
          </h4>
          >
        </section>
      );
    }
  }
}
