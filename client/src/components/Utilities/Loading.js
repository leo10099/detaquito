import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

export default class Loading extends Component {
  state = {
    isLoading: false
  };

  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  render() {
    const { children } = this.props;
    if (this.state.isLoading) {
      return <PulseLoader />;
    }

    return children({
      isLoading: this.state.isLoading,
      toggleLoading: this.toggleLoading
    });
  }
}
