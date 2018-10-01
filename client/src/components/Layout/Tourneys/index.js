import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../Elements/Button';
import { colors } from '../../Utilities';
import { Card } from '../../Elements/';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';

import './Tourneys.styl';

export class Tournaments extends Component {
  async componentDidMount() {
    const response = await axios.get(
      `/api/fetch/tourney/user/?u=${this.props.auth._id}`
    );
    this.setState({
      userTourneys: response.data
    });
  }
  state = {
    userTourneys: null
  };
  checkUserStatus = index => {
    if (index === 'confirmed') {
      return 'Activo';
    } else {
      return 'Esperando aprobación';
    }
  };

  availableActions = (index, tourneyOwner, id) => {
    return (
      <div className="dashboard__tournaments__list__actions">
        {index === 'confirmed' && (
          <Link to={`/tournament/${id}`} className="text-dark">
            <span>
              Detalle &nbsp;{' '}
              <i className="fa fa-search baseline text-primary" />
            </span>
          </Link>
        )}
        {tourneyOwner === this.props.auth._id && (
          <span>
            Administrar &nbsp;
            <i className="fa fa-wrench text-primary" />
          </span>
        )}
        {tourneyOwner !== this.props.auth._id && (
          <span>
            Abandonar &nbsp;{' '}
            <i className="fa fa-times-circle baseline text-danger" />
          </span>
        )}
      </div>
    );
  };
  render() {
    const { userTourneys } = this.state;

    return (
      <section id="Tournaments">
        <h1 className="dashboard__title">Mis Torneos</h1>
        <p className="dashboard__lead">
          Los Torneos son competiciones cerradas entre usuarios de De Taquito.
          <br />
          Demostrarle a tus amistades y familiares quién sabe más de fútbol
        </p>
        {userTourneys && (
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
