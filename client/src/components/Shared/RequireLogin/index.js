import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  checkIfUserConfigIsComplete,
  checkIfUserIsLoggedIn
} from '../../../global/helpers.js';
import { fetchUser } from '../../../global/actions/auth/';
export default function(WrappedComponent) {
  class RequireAuth extends Component {
    async componentWillMount() {
      await this.props.fetchUser();
      await checkIfUserIsLoggedIn(this.props);
      await checkIfUserConfigIsComplete(this.props);
    }
    async componentWillReceiveProps(props) {
      await checkIfUserIsLoggedIn(props);
      await checkIfUserConfigIsComplete(props);
    }
    render() {
      {
        return this.props.auth && <WrappedComponent {...this.props} />;
      }
    }
  }
  const mapStateToProps = ({ auth }) => ({ auth });
  return connect(
    mapStateToProps,
    { fetchUser }
  )(RequireAuth);
}
