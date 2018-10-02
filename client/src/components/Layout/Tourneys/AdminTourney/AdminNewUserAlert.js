import React from 'react';
import { Card } from '../../../Elements/';
import PropTypes from 'prop-types';

const AdminNewUserAlert = props => {
  const { unconfirmed } = props;
  return (
    <section className="Tourney__Admin__EditMembers">
      <div className="text-white">
        <Card className="Dashboard__Card--alert">
          <span className="Dashboard__Card__unconfirmedAlertLead">
            ¡Ey, tenés pendientes <strong>solicitudes de ingreso</strong> a este
            Torneo!
          </span>{' '}
          {unconfirmed &&
            unconfirmed.map(unconfirmedUser => {
              return (
                <section
                  key={unconfirmedUser._id}
                  className="Dashboard__Card__Group"
                >
                  <div className="Dashboard__Card__unconfirmedUser">
                    {unconfirmedUser.alias}
                    {unconfirmedUser.avatar && (
                      <img src={unconfirmedUser.avatar} />
                    )}
                  </div>
                  <div className="Dashboard__Card__unconfirmedUserAdminActions">
                    <span className="Dashboard__Card__unconfirmedUserAdminActions--reject">
                      Rechazar
                    </span>
                    <span className="Dashboard__Card__unconfirmedUserAdminActions--accept">
                      Aceptar
                    </span>
                  </div>
                </section>
              );
            })}
        </Card>
      </div>
    </section>
  );
};

AdminNewUserAlert.propTypes = {};

export default AdminNewUserAlert;
