import React, { Component } from 'react';
import axios from 'axios';
import Button from '../../../Elements/Button';
import { colors } from '../../../Utilities';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './joinTourney.styl';

class JoinTourney extends Component {
  input = React.createRef();

  handleSubmit = async event => {
    event.preventDefault();
    const { value: number } = this.input.current;

    if (!number || number.match('[a-zA-Z]+')) {
      toastr.error('Debés ingresar el número del torneo');
      return false;
    }

    await axios
      .post('/api/update/tourney/join', { number })
      .then(response => {
        console.log(response);
        if (
          response.data.tourney.users_unconfirmed.includes(this.props.auth._id)
        ) {
          toastr.success(
            'Ya estás en el torneo. Sólo falta que su creador te confirme.'
          );
          this.props.history.replace('/tournaments');
        }
      })
      .catch(e => {
        toastr.error(e.response.data.error);
      });
  };
  render() {
    return (
      <section className="Tourney__Join">
        <h1 className="dashboard__title">MIS TORNEOS</h1>
        <p className="dashboard__lead">
          Para unirte necesitás el número de Torneo. Si no lo tenés, pedíselo al
          creador del mismo
        </p>
        <form onSubmit={this.handleSubmit} className="Tourney__Join__form">
          <span htmlFor="name" className="label-inline text-white">
            <strong>Nº de Torneo</strong>
          </span>
          <input
            type="text"
            name="input"
            ref={this.input}
            className="Tourney__New__input"
          />
          <div
            className="Tourney__New__Button-panel"
            onClick={this.handleSubmit}
          >
            <Button
              type="submit"
              backgroundColor={colors.primary}
              textColor={colors.white}
            >
              Solicitar Ingreso
            </Button>
          </div>
        </form>
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
)(withRouter(JoinTourney));
