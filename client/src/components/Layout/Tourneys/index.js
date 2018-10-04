import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../Elements/Button';
import { colors } from '../../Utilities';
import { Card } from '../../Elements/';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import toastr from 'toastr';

import './Tourneys.styl';

export class Tournaments extends Component {
  state = {
    userTourneys: null
  };

  componentDidMount() {
    this.fetchTourneyData();
  }

  async fetchTourneyData() {
    const response = await axios.get(
      `/api/fetch/tourney/user/?u=${this.props.auth._id}`
    );
    this.setState({
      userTourneys: response.data
    });
  }
  checkUserStatus = index => {
    if (index === 'confirmed') {
      return 'Activo';
    } else {
      return 'Esperando aprobación';
    }
  };

  userLeave = t_id => {
    axios
      .patch('/api/update/tourney/leave', {
        _id: t_id,
        user: this.props.auth._id
      })
      .then(async response => {
        toastr.success(response.data.data);
        await this.fetchTourneyData();
        this.forceUpdate();
      })
      .catch(e => {
        toastr.error(
          'Hubo un error al abandonar el Torneo. Por favor, intentá más tarde.'
        );
      });
  };

  availableActions = (index, tourneyOwner, id) => {
    return (
      <div className="dashboard__tournaments__list__actions">
        {index === 'confirmed' && (
          <Link to={`/tournament/${id}`} className="text-dark">
            <span>
              Detalle &nbsp;
              <i className="fa fa-search baseline text-primary" />
            </span>
          </Link>
        )}
        {tourneyOwner === this.props.auth._id && (
          <Link to={`/admin/${id}`} className="text-dark">
            <span>
              Gestionar &nbsp;
              <i className="fa fa-wrench text-primary" />
            </span>
          </Link>
        )}
        {tourneyOwner !== this.props.auth._id && (
          <span
            onClick={() => this.userLeave(id)}
            style={{ cursor: 'pointer' }}
          >
            Abandonar &nbsp;{' '}
            <i className="fa fa-times-circle baseline text-danger" />
          </span>
        )}
      </div>
    );
  };
  render() {
    const { userTourneys } = this.state;
    if (!userTourneys) {
      return (
        <div className="loading-container">
          <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
        </div>
      );
    }
    return (
      <section id="Tournaments">
        <h1 className="dashboard__title">Mis Torneos</h1>
        <p className="dashboard__lead">
          Los Torneos son competiciones cerradas entre usuarios de De Taquito.
          <br />
          Demostrarle a tus amistades y familiares quién sabe más de fútbol
        </p>
        {userTourneys &&
          (userTourneys.confirmed.length ||
            userTourneys.unconfirmed.length) && (
            <Card className="dashboard__tornaments__card">
              <section className="dashboard__tournaments__list">
                <div className="dashboard__tournaments__list-th">Nombre</div>
                <div className="dashboard__tournaments__list-th">Estado</div>
                <div className="dashboard__tournaments__list-th">Acciones</div>
                {Object.keys(userTourneys).map(index => {
                  return userTourneys[index].map(t => {
                    return (
                      <Fragment key={t._id}>
                        <div className="dashboard__tournaments__list-td">
                          {t.name}
                        </div>
                        <div className="dashboard__tournaments__list-td">
                          {this.checkUserStatus(index)}
                        </div>
                        <div className="dashboard__tournaments__list-td">
                          {this.availableActions(index, t.owner, t._id)}
                        </div>
                      </Fragment>
                    );
                  });
                })}
              </section>
            </Card>
          )}
        <div className="dashboard__tournaments__button-panel">
          <Link to="/joinTourney">
            <Button backgroundColor={colors.secondary} textColor={colors.black}>
              Unirme
            </Button>
          </Link>
          <Link to="/newTourney">
            <Button backgroundColor={colors.secondary} textColor={colors.black}>
              Crear
            </Button>
          </Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  null
)(Tournaments);
