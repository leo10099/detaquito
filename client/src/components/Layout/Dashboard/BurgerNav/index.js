import React, { Component } from 'react';
import delay from '../../../../plugins/delay';
import { Keyframes, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
import { colors } from '../../../Utilities/';
import './BurgerNav.styl';
import Icon from '../../../Elements/Icon';

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

const Sidebar = Keyframes.Spring({
  peek: [
    { delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast },
    { delay: 800, to: { x: -80 }, config: config.slow }
  ],

  open: { to: { x: 0 }, config: config.default },

  close: async call => {
    await delay(400);
    await call({ to: { x: -80 }, config: config.gentle });
  }
});

const Content = Keyframes.Trail({
  peek: [
    { delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } },
    { to: { x: -100, opacity: 0 } }
  ],
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } }
});

const items = [
  <ul className="dashboard__sidebar-nav__items">
    <li className="dashboard__sidebar-nav__item">
      <Link to="/dashboard">
        <i className="far baseline fa-bell" />
        &nbsp; Novedades
      </Link>
    </li>
    <li className="dashboard__sidebar-nav__item">
      <Link to="/predict">
        {' '}
        <i className="far baseline fa-edit" />
        &nbsp;Pronosticar
      </Link>
    </li>
    <li className="dashboard__sidebar-nav__item">
      <Link to="/results">
        {' '}
        <i className="far baseline fa-calendar-alt" />
        &nbsp; Mis Resultados
      </Link>
    </li>
    { /*<li className="dashboard__sidebar-nav__item">
      <Link to="/rankings">
        {' '}
        <i className="fas fa-award" /> &nbsp; Rankings
      </Link>
</li>*/}
    <li className="dashboard__sidebar-nav__item">
      <Link to="/tournaments">
        <i className="fas fa-trophy" /> &nbsp; Mis Torneos
      </Link>
    </li>
  </ul>
];

export default class BurgerNav extends Component {
  static propTypes = {};
  menuContainerRef = React.createRef();
  state = { open: undefined };

  toggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  /*
  componentDidMount() {
    setTimeout(() => {
      this.toggle();
    }, 1000);
  }*/
  render() {
    const state =
      this.state.open === undefined
        ? 'peek'
        : this.state.open
          ? 'open'
          : 'close';
    //    const icon = this.state.open ? 'fold' : 'unfold';

    return (
      <section id="DashboardBurgerNav">
        <span className="dashboardBurgerNav__toggle" onClick={this.toggle}>
          <Icon
            name={this.state.open ? 'menu-opened' : 'menu-closed'}
            color={colors.black}
          />
        </span>

        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              id="navBar"
              className="dashboardBurgerNav__navbar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
              }}
            >
              <Content
                native
                keys={items.map((_, i) => i)}
                config={{ tension: 200, friction: 20 }}
                state={state}
              >
                {items.map((item, i) => ({ x, ...props }) => (
                  <animated.div
                    className="dashboardBurgerNav__navbar__container"
                    style={{
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                      ...props
                    }}
                  >
                    {item}
                  </animated.div>
                ))}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </section>
    );
  }
}
