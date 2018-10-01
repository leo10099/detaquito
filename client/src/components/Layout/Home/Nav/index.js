import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toggle, colors } from '../../../Utilities/index';
import { Modal } from '../../../Elements/';
import LoginCard from '../../../Layout/Login/LoginCard';
import './Nav.styl';

export default class Nav extends Component {
  render() {
    const logotipo = '/static/img/logotipo.png';
    const { auth } = this.props;

    const navItemText = auth ? (
      <span className="nav__item pointer">
        <Link to="/dashboard" className="nav__item pointer">
          Mi Prode &nbsp;
          <i className="fa fa-arrow-right" />
        </Link>
      </span>
    ) : auth === false ? (
      'Ingresar'
    ) : (
      ''
    );

    return (
      <nav id="Nav">
        <Link to="/">
          <img src={logotipo} alt="De Taquito" />
        </Link>
        <Toggle>
          {({ on, toggle }) => (
            <span
              className="nav__item pointer"
              onClick={auth ? () => null : toggle}
            >
              {navItemText}
              &nbsp;
              <Modal on={on} toggle={toggle} closeButtonColor={colors.primary}>
                <LoginCard />
              </Modal>
            </span>
          )}
        </Toggle>
      </nav>
    );
  }
}
