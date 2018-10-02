import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import toastr from 'toastr';

import PendingUserAlert from './AdminNewUserAlert';

import './AdminTourney.styl';

class AdminTourney extends Component {
  state = {
    t: {},
    admin: ''
  };

  fetchTourneyData() {
    const { tourney } = this.props.match.params;
    axios.get(`/api/fetch/tourney/${tourney}`).then(response => {
      this.setState({ t: { ...response.data.tourney } });
    });
  }
  componentDidMount() {
    this.fetchTourneyData();
  }

  acceptUser = (tourney, user) => {};

  rejectUser = user => {
    axios
      .patch('/api/update/tourney/reject', { _id: this.state.t._id, user })
      .then(response => {
        this.fetchTourneyData();
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
    const { t } = this.state;
    const { acceptUser, rejectUser } = this;
    return (
      <section className="Tourney__Admin">
        <h1 className="dashboard__title">GESTIÓN DE TORNEO</h1>
        <h3 className="dashboard__lead Admin__Tourney__Options text-white">
          <span className="text-secondary">Quiero: &nbsp;</span>
          <span
            className="pointer"
            onClick={() => {
              this.setState({ admin: 'users' });
            }}
          >
            &nbsp; Editar Miembros
          </span>{' '}
          <span className="text-secondary">|</span>{' '}
          <span
            className="pointer"
            onClick={() => {
              this.setState({ admin: 'tourney' });
            }}
          >
            &nbsp;Editar Torneo
          </span>
        </h3>
        {t &&
          t.length && (
            <PendingUserAlert
              tourney={t._id}
              unconfirmed={t.users_unconfirmed}
              acceptUser={acceptUser}
              rejectUser={rejectUser}
            />
          )}
      </section>
    );
  }
}

export default withRouter(AdminTourney);
