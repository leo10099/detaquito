import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Card } from "../../../Elements";

import "./singleTourney.styl";

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
          tourney: response.data.tourney,
          scores: response.data.scores
        });
      });
  }
  render() {
    const { tourney, scores: members } = this.state;
    return (
      <section className="text-white">
        <section className="Single__Tourney__Details">
          <Card className="Single__Tourney__Details__table">
            <div className="Single__Tourney__Details__th">RANKING</div>
            <div className="Single__Tourney__Details__th">MIEMBRO</div>
            <div className="Single__Tourney__Details__th">PUNTOS</div>
            {members &&
              members.map((member, index) => {
                return (
                  <Fragment key={member._id}>
                    <div className="Single__Tourney__Details__td">
                      {index + 1}
                    </div>
                    <div className="Single__Tourney__Details__td">
                      {/*member.user.alias*/}
                    </div>
                    <div className="Single__Tourney__Details__td">
                      {/*member.total*/}
                    </div>
                  </Fragment>
                );
              })}
          </Card>
        </section>
      </section>
    );
  }
}

const mapStatetoProps = ({ conf }) => {
  return { conf };
};

export default connect(
  mapStatetoProps,
  null
)(TourneyLastRound);
