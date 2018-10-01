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
      .post('/api/create/tourney/', { name: event.target.name.value })
      .then(async response => {
        await this.setState({ isUploading: false });
        await this.setState({ newT: response.data.data });
        await this.setState({ continue: true });
      })
      .catch(e => {
        toastr.error(
          'Hubo un error al guardar el Torneo. Intentá más tarde, por favor.'
        ),
          this.setState({ isUploading: false });
      });
  };

  render() {
    const { isUploading, newT } = this.state;
    if (!this.state.continue) {
      return (
        <section className="Tourney__New">
          <h1 className="dashboard__title">CREAR TORNEO</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="Tourney__New__form">
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
            Para que otros usuarios puedan sumarse pasales el número del mismo:
            &nbsp;
            <span className="text-secondary">{newT.number}</span>.<br />
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
