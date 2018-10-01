import React from 'react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { PulseLoader } from 'react-spinners';
import { colors } from '../../Utilities';

const Start = props => {
  const deadline = props.conf ? new Date(props.conf.deadline) : null;

  return deadline ? (
    <section className="dashboard__start">
      <h1 className="dashboard__title">Mi Prode</h1>
      <div className="dashboard__news">
        <i className="fa fa-bell text-secondary" />
        &nbsp; ¡Ey, pronosticá la fecha
        {'  '}
        {props.conf.round}! Tenés hasta el{' '}
        {format(deadline, 'dddd', { locale: es })}{' '}
        {format(deadline, 'D', { locale: es })}{' '}
        {format(deadline, 'MMMM', { locale: es })} a las{' '}
        {format(deadline, 'H', { locale: es })} hs.
      </div>
    </section>
  ) : (
    <div className="loading-container">
      <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
    </div>
  );
};

export default Start;
