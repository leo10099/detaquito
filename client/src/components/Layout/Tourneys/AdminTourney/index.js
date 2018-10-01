import React, { Component } from 'react';
import ProçpTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card } from '../../../Elements/';
import axios from 'axios';

import './AdminTourney.styl';

class AdminTourney extends Component {
  state = {
    t: {},
    admin: ''
  };
  componentDidMount() {
    const { tourney } = this.props.match.params;
    axios.get(`/api/fetch/tourney/${tourney}`).then(response => {
      this.setState({ t: { ...response.data.tourney } });
    });
  }

  render() {
    const { t } = this.state;
    return (
      <section className="Tourney__Admin">
        <h1 className="dashboard__title">GESTIÓN DE TORNEO</h1>
        <h3 className="dashboard__lead text-white">
          <span className="text-secondary pointer">Quiero: &nbsp;</span>
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
        <Card className="dashboard__tornaments__card" />
      </section>
    );
  }
}

export default withRouter(AdminTourney);
