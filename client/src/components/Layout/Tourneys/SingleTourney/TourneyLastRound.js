import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
    return (
      <section className="text-white">
        TOURNEY LAST {this.props.conf.round} POINTS
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
