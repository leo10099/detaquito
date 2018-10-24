import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarNav.styl';

const SidebarNav = () => {
  return (
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
          &nbsp; Pronosticar
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
          <i className="fas fa-award" />
          &nbsp; Rankings
        </Link>
  </li>*/}
      <li className="dashboard__sidebar-nav__item">
        <Link to="/tournaments">
          {' '}
          <i className="fa baseline fa-trophy" />
          &nbsp; Mis Torneos
        </Link>
      </li>
    </ul>
  );
};

export default SidebarNav;
