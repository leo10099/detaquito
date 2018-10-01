import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from '../Home/Nav/';
import { fetchUser } from '../../../global/actions/auth/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Info.styl';

class Info extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <section id="Info">
        <Nav {...this.props} />
        <div className="info__container">
          <div className="info__text-frame">
            <span className="info__text-frame__title">
              UNA NUEVA FORMA <br />
              DE JUGAR
            </span>
            <p>
              A diferencia del prode tradicional, pronosticás el{' '}
              <span className="info__text-frame--highligth">
                resultado exacto
              </span>
              .<br /> Por ejemplo: 3 a 2, 1 a 1, y así. <br />
              Mientras más te acerques, más puntos sumás.
              <br />
            </p>
            <span className="info__text-frame__title">
              DESAFIÁ A TUS AMIGOS
            </span>
            <p>
              Una vez que pronosticás participás en una tabla general. Pero
              también podés armar un{' '}
              <span className="info__text-frame--highligth">
                Torneo cerrado
              </span>{' '}
              e invitar a quién quieras.
            </p>

            <span className="info__text-frame--foter">
              <Link to="/">
                {' '}
                <i className="fa fa-caret-left footer-arrow" />
                &nbsp;Volver{' '}
              </Link>
            </span>
          </div>
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
  { fetchUser }
)(Info);
