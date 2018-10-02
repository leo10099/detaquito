import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
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

  //TODO --> refactor to dumb component
  renderEditMembers = (unconfirmed, confirmed) => {
    return (
      <section className="Tourney__Admin__EditMembers">
        <div className="text-white">
          <Card className="Dashboard__Card--alert">
            <span className="Dashboard__Card__unconfirmedAlertLead">
              ¡Ey, tenés pendientes <strong>solicitudes de ingreso</strong> a
              este Torneo!
            </span>{' '}
            {unconfirmed &&
              unconfirmed.map(unconfirmedUser => {
                return (
                  <section
                    key={unconfirmedUser._id}
                    className="Dashboard__Card_"
                  >
                    <div className="Dashboard__Card__unconfirmedUser">
                      {unconfirmedUser.alias}
                      {unconfirmedUser.avatar && (
                        <img src={unconfirmedUser.avatar} />
                      )}

                      <div className="Dashboard__Card__unconfirmedUserAdminActions">
                        <span className="Dashboard__Card__unconfirmedUserAdminActions--reject">
                          Rechazar
                        </span>
                        <span className="Dashboard__Card__unconfirmedUserAdminActions--accept">
                          Aceptar
                        </span>
                      </div>
                    </div>
                  </section>
                );
              })}
          </Card>
        </div>
      </section>
    );
  };

  render() {
    const { t } = this.state;
    const { renderEditMembers } = this;
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
        {t && renderEditMembers(t.users_unconfirmed, t.users)}
      </section>
    );
  }
}

export default withRouter(AdminTourney);
