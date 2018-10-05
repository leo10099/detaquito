import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { colors } from "../../../Utilities";
import { Card } from "../../../Elements";
import axios from "axios";

import "./singleTourney.styl";

import "./singleTourney.styl";

class SingleTourney extends Component {
  render() {
    return <section className="Single__Tourney">HOLA</section>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(SingleTourney));
