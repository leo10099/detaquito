import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card } from '../../../Elements';

import './Header.styl';

const logotipo = '/static/img/logotipo.png';

export class Header extends Component {
  state = {
    cardStyle: 'dashboard__header__Card-Wrapper'
  };

  static propTypes = {
    alias: PropTypes.string.isRequired
  };
  showUserCard = () => {
    this.setState({ cardStyle: 'dashboard__header__Card-Wrapper--enter' });
    setTimeout(() => {
      this.setState({ cardStyle: 'dashboard__header__Card-Wrapper--active' });
    }, 200);
  };

  hideUserCard = () => {
    this.setState({ cardStyle: 'dashboard__header__Card-Wrapper' });
  };
  render() {
    const { alias } = this.props;
    const { cardStyle } = this.state;
    return (
      <section className="dashboard__header">
        <div className="dashboard__header__left">
          <Link to="/">
            <img src={logotipo} alt="De Taquito" />
          </Link>
        </div>
        <div className="dashboard__header__right">
          {alias && (
            <div
              className="dashboard__header__avatar"
              onClick={this.showUserCard}
              onMouseEnter={this.showUserCard}
            >
              <i className="far fa-user text-secondary" />
              <span className="text-secondary pointer">
                &nbsp; &nbsp;
                {alias}
              </span>
            </div>
          )}
          {alias && (
            <div className={cardStyle} onMouseLeave={this.hideUserCard}>
              <Card style={{ padding: 1.5 }}>
                <div className="dashboard__header__options">
                  <div className="dashboard__header__options-link">
                    <i
                      className="fa fa-times cerrar pointer"
                      onClick={this.hideUserCard}
                    />
                  </div>
                  <div className="dashboard__header__options-link">
                    <Link to="/account">
                      <i className="fa fa-user-cog" />
                      &nbsp; Mi cuenta
                    </Link>
                  </div>
                  <div className="dashboard__header__options-link">
                    <a href="/auth/logout">
                      <i className="fa fa-sign-out-alt " /> &nbsp; Salir
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Header;
