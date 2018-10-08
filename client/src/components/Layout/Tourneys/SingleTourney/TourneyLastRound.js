import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card } from '../../../Elements';
import { colors } from '../../../Utilities';
import { PulseLoader } from 'react-spinners';

import './singleTourney.styl';

class TourneyLastRound extends Component {
  state = {};

  componentDidMount() {
    axios
      .get(
        `/api/fetch/tourney/ranked/lastround/?_id=${
          this.props.match.params._id
        }&current=${this.props.conf.round}`
      )
      .then(response => {
        this.setState({
          scores: response.data.ranked
        });
      });
  }

  checkIfScoreBelongsToUser = (auth, member) => {
    return auth === member
      ? { fontWeight: 'bold', backgroundColor: colors.secondary }
      : null;
  };

  render() {
    const { scores: members } = this.state;
    const { round } = this.props.conf;
    const { auth } = this.props;

    if (auth && round && members && members.length) {
      return (
        <section className="text-white">
          <h3 className="dashboard__lead">PUNTAJES DE LA FECHA Nº {round}</h3>
          <section className="Single__Tourney__Details">
            <Card style={{ opacity: '0.9' }}>
              <secion className="Single__Tourney__Details__table">
                <div className="Single__Tourney__Details__th">RANKING</div>
                <div className="Single__Tourney__Details__th">MIEMBRO</div>
                <div className="Single__Tourney__Details__th">PUNTOS</div>
                {members &&
                  members.map((member, index) => {
                    return (
                      <Fragment key={member._id}>
                        <div
                          className="Single__Tourney__Details__td"
                          style={this.checkIfScoreBelongsToUser(
                            auth._id,
                            member.user_id
                          )}
                        >
                          {index + 1}
                        </div>
                        <div
                          className="Single__Tourney__Details__td"
                          style={this.checkIfScoreBelongsToUser(
                            auth._id,
                            member.user_id
                          )}
                        >
                          <img
                            src={
                              member.avatar ? member.avatar : 'aca va un escudo'
                            }
                            alt={member.alias}
                          />
                          {member.alias}
                        </div>
                        <div
                          className="Single__Tourney__Details__td"
                          style={this.checkIfScoreBelongsToUser(
                            auth._id,
                            member.user_id
                          )}
                        >
                          {member.total}
                        </div>
                      </Fragment>
                    );
                  })}
              </secion>
            </Card>
          </section>
        </section>
      );
    } else {
      return (
        <div className="loading-container">
          <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
        </div>
      );
    }
  }
}

const mapStatetoProps = ({ auth, conf }) => {
  return { auth, conf };
};

export default connect(
  mapStatetoProps,
  null
)(TourneyLastRound);
