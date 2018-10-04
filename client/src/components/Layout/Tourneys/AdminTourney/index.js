import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import toastr from 'toastr';

import PendingUserAlert from './AdminNewUserAlert';

import './AdminTourney.styl';

class AdminTourney extends Component {
  state = {
    admin: '',
    editNameDisabled: true,
    editStartOnRoundDisabled: true
  };

  NameInput = React.createRef();
  RoundInput = React.createRef();

  fetchTourneyData() {
    const { tourney } = this.props.match.params;
    axios.get(`/api/fetch/tourney/${tourney}`).then(response => {
      this.setState({ t: { ...response.data.tourney } });
    });
  }
  componentDidMount() {
    this.fetchTourneyData();
  }

  toggleInput = () => {
    if (this.state.editNameDisabled) {
      this.setState({ editNameDisabled: false }, () => {
        this.NameInput.current.select();
      });
    } else {
      const { _id: tourney } = this.state.t;
      const { value: newName } = this.NameInput.current;
      axios
        .patch('/api/update/tourney/name', { tourney, newName })
        .then(response =>
          toastr.success('Cambiaste exitosamente el nombre tu Torneo')
        )
        .catch(e => {
          if (e.response.status === 422) {
            toastr.error(e.response.data.message);
          } else {
            toastr.error(
              'Hubo un error al cambiar el nombre. Por favor, intentá más tarde'
            );
          }
        });
      this.setState({ editNameDisabled: true });
    }
  };

  toggleRound = () => {
    if (this.state.editStartOnRoundDisabled) {
      this.setState({ editStartOnRoundDisabled: false }, () => {
        this.RoundInput.current.select();
      });
    } else {
      const { _id: tourney } = this.state.t;
      const { value: newStartOnRound } = this.RoundInput.current;
      axios
        .patch('/api/update/tourney/round', { tourney, newStartOnRound })
        .then(response =>
          toastr.success(
            'Cambiaste exitosamente la fecha de inicio de tu Torneo'
          )
        )
        .catch(e => {
          if (e.response.status === 422) {
            toastr.error(e.response.data.message);
          } else {
            toastr.error(
              'Hubo un error al cambiar la fecha de inicio. Por favor, intentá más tarde'
            );
          }
        });
      this.setState({ editStartOnRoundDisabled: true });
    }
  };

  acceptUser = user => {
    axios
      .patch('/api/update/tourney/accept', { _id: this.state.t._id, user })
      .then(response => {
        this.fetchTourneyData();
        this.forceUpdate();
        toastr.success(
          'Aceptaste exitosamente al usuario, ya es miembro del Torneo.'
        );
      });
  };

  rejectUser = user => {
    axios
      .patch('/api/update/tourney/reject', { _id: this.state.t._id, user })
      .then(response => {
        this.fetchTourneyData();
        this.forceUpdate();
        toastr.success(
          'Rechazaste la solicitud del usuario. No participará de tu Torneo'
        );
      })
      .catch(e => {
        toastr.error(
          'No se pudo rechazar al usuario. Por favor, intentá más tarde'
        );
      });
  };

  render() {
    const { t, editNameDisabled, editStartOnRoundDisabled } = this.state;
    const { acceptUser, rejectUser, toggleInput, toggleRound } = this;
    return (
      <section className="Tourney__Admin">
        <h1 className="dashboard__title">GESTIÓN DE TORNEO</h1>
        {t &&
          t.users_unconfirmed.length > 0 && (
            <PendingUserAlert
              tourney={t._id}
              unconfirmed={t.users_unconfirmed}
              acceptUser={acceptUser}
              rejectUser={rejectUser}
            />
          )}
        {t && (
          <form>
            <div className="form-group">
              <label
                htmlFor="TourneyNumber"
                className="label-inline text-white"
              >
                Número
              </label>
              <input
                type="text"
                style={{ width: '25%' }}
                className="Tourney__Admin__Input"
                disabled
                defaultValue={t.number}
                id="TourneyNumber"
              />
              <div className="feedback">
                Dale éste número a los usuarios de De Taquito para que puedan
                unirse al Torneo.
              </div>

              <div className="form-group">
                <label
                  htmlFor="TourneyName"
                  className="label-inline text-white"
                >
                  Nombre{' '}
                </label>
                <input
                  type="text"
                  className="Tourney__Admin__Input"
                  disabled={editNameDisabled}
                  defaultValue={t.name}
                  id="TourneyName"
                  ref={this.NameInput}
                />
                {editNameDisabled ? (
                  <span
                    className="Tourney__Admin__Form-Action"
                    onClick={toggleInput}
                  >
                    <i className="fa fa-edit" /> &nbsp; Modificar
                  </span>
                ) : (
                  <span
                    className="Tourney__Admin__Form-Action"
                    onClick={toggleInput}
                  >
                    <i className="fa fa-save" /> &nbsp; Guardar
                  </span>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor="StartOnRound"
                  className="label-inline text-white"
                >
                  Comenzar en la Fecha
                </label>
                <input
                  type="text"
                  className="Tourney__Admin__Input"
                  disabled={editStartOnRoundDisabled}
                  defaultValue={t.start_on_round}
                  id="StartOnRound"
                  ref={this.RoundInput}
                />
                {editStartOnRoundDisabled ? (
                  <span
                    className="Tourney__Admin__Form-Action"
                    onClick={toggleRound}
                  >
                    <i className="fa fa-edit" /> &nbsp; Modificar
                  </span>
                ) : (
                  <span
                    className="Tourney__Admin__Form-Action"
                    onClick={toggleRound}
                  >
                    <i className="fa fa-save" /> &nbsp; Guardar
                  </span>
                )}
              </div>
            </div>
          </form>
        )}
      </section>
    );
  }
}

export default withRouter(AdminTourney);
