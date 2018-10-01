import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../../../global/actions/auth/';
import { Link } from 'react-router-dom';
import Nav from './Nav/';
import Button from '../../Elements/Button';
import { colors } from '../../Utilities';
import './Home.styl';
class Home extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };
  async componentWillMount() {
    await this.props.fetchUser();
  }

  render() {
    const logo = '/static/img/logo.png';
    return (
      <section id="Home">
        <Nav {...this.props} />
        <div className="home__grid">
          <img src={logo} alt="De Taquito" className="logo" />
          <div className="home home__subtitle">
            <h3>AHORA GANA QUIEN MÁS SABE </h3>
          </div>
          <div className="home__buton-container">
            <Link to="/info">
              <Button borderColor={colors.white} textColor={colors.white}>
                + info
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                backgroundColor={colors.secondary}
                textColor={colors.black}
              >
                jugar
              </Button>
            </Link>
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
)(Home);
