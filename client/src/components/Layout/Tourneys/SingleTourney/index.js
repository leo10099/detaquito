import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { colors } from '../../../Utilities';
import { Card } from '../../../Elements';

// import PropTypes from 'prop-types';
import axios from 'axios';

import './SingleTourney.styl';

class SingleTourney extends Component {
  async componentDidMount() {
    const t = await this.fetchTourneyDetails();
    this.fetchMemberData(this.state.t);
  }

  async fetchTourneyDetails() {
    const _id = this.props.match.params.tourney;

    const tourney = await axios.get(`/api/fetch/tourney/${_id}`);
    this.setState({ t: tourney.data.tourney });
  }

  async fetchMemberData(t) {
    t.users.forEach(async member => {
      const details = await axios.get(`/api/fetch/scores/user/${member._id}`);
      console.log(details);
    });
  }

  state = {
    t: null,
    members: []
  };

  render() {
    const { t } = this.state;
    return (
      <section className="Single__Tourney">
        <h1 className="dashboard__title">Mis Torneos</h1>
        {t ? (
          <Fragment>
            <h3 className="dashboard__subtitle">{t.name}</h3>
            <section className="Single__Tourney__Details">
              <Card style={{ opacity: 0.9 }}>HOLA</Card>
            </section>
          </Fragment>
        ) : (
          <div className="loading-container">
            <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
          </div>
        )}
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
)(withRouter(SingleTourney));
