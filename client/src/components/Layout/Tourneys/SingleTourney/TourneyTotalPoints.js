import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Card } from "../../../Elements";
import { colors } from "../../../Utilities";
import { PulseLoader } from "react-spinners";

import "./singleTourney.styl";

class TourneyLastRound extends Component {
  state = {};

  componentDidMount() {
    axios
      .get(
        `/api/fetch/tourney/ranked/totalpoints/?_id=${
          this.props.match.params._id
        }&current=${this.props.conf.round}`
      )
      .then(response => {
        this.setState({
          scores: response.data.scores
        });
      });
  }

  checkIfScoreBelongsToUser = member => {
    return this.props.auth._id === member
      ? { fontWeight: "bold", backgroundColor: colors.secondary }
      : null;
  };

  render() {
    const { scores: members } = this.state;

    if (members && members.length) {
      return (
        <section className="text-white">
          <h3 className="dashboard__lead">TABLA DE POSICIONES GENERAL</h3>
          <section className="Single__Tourney__Details">
            <Card className="Single__Tourney__Details__table">
              <div className="Single__Tourney__Details__th">RANKING</div>
              <div className="Single__Tourney__Details__th">MIEMBRO</div>
              <div className="Single__Tourney__Details__th">PUNTOS</div>
              {members &&
                members.map((member, index) => {
                  return (
                    <Fragment key={member._id}>
                      <div
                        className="Single__Tourney__Details__td"
                        style={this.checkIfScoreBelongsToUser(member.user_id)}
                      >
                        {index + 1}
                      </div>
                      <div
                        className="Single__Tourney__Details__td"
                        style={this.checkIfScoreBelongsToUser(member.user_id)}
                      >
                        {member.alias}
                      </div>
                      <div
                        className="Single__Tourney__Details__td"
                        style={this.checkIfScoreBelongsToUser(member.user_id)}
                      >
                        {member.count}
                      </div>
                    </Fragment>
                  );
                })}
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

const mapStatetoProps = ({ conf, auth }) => {
  return { conf, auth };
};

export default connect(
  mapStatetoProps,
  null
)(TourneyLastRound);
