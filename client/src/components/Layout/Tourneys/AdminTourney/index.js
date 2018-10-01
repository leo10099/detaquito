import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card } from '../../../Elements/';
import axios from 'axios';

import './AdminTourney.styl';

class AdminTourney extends Component {
  componentDidMount() {
    const { tourney } = this.props.match.params;
    axios.get(`/api/fetch/tourney/${tourney}`).then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <section className="Tourney__Admin">
        <h1 className="dashboard__title">GESTIÓN DE TORNEO</h1>
        <h3 className="dashboard__lead">Miembros activos</h3>
        <Card className="dashboard__tornaments__card">PRUEBA</Card>
      </section>
    );
  }
}

export default withRouter(AdminTourney);
