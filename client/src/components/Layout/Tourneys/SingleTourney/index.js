import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './singleTourney.styl';

class SingleTourney extends Component {
  render() {
    return (
      <section className="Single__Tourney">
        {this.props.match.params.tourney}{' '}
      </section>
    );
  }
}

export default withRouter(SingleTourney);
