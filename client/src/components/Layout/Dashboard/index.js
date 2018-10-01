import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import { fetchUser } from '../../../global/actions/auth/';
import { fetchRoundConfig } from '../../../global/actions/conf/';
import MobileSidebarNav from './BurgerNav/';
import SidebarDesktopRoutes from './SidebarRoutes';
import DesktopNav from './SidebarNav';

import Header from './Header/';
import './Dashboard.styl';

export class Dashboard extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchRoundConfig();
  }

  render() {
    const { auth } = this.props;
    return (
      <section id="Dashboard">
        <Header {...auth} />
        <Router>
          <section className="dashboard__container">
            <nav className="dashboard__sidebar-nav__desktop">
              <DesktopNav />
            </nav>
            <nav className="dashboard__sidebar-nav__mobile">
              <MobileSidebarNav />
            </nav>
            {SidebarDesktopRoutes.map(({ path, main: C }) => (
              <Route
                key={path}
                path={path}
                exact={path.exact}
                render={props => <C {...this.props} />}
              />
            ))}
          </section>
        </Router>
      </section>
    );
  }
}

const mapStateToProps = ({ auth, conf }) => {
  return { auth, conf };
};

export default connect(
  mapStateToProps,
  { fetchUser, fetchRoundConfig }
)(Dashboard);
