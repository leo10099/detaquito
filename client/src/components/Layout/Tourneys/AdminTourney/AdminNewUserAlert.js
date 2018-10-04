import React from 'react';
import { Card } from '../../../Elements/';
import PropTypes from 'prop-types';

const AdminNewUserAlert = props => {
  const { unconfirmed, acceptUser, rejectUser } = props;
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
                      <img
                        src={unconfirmedUser.avatar}
                        alt={unconfirmedUser.alias}
                      />
                    )}
                  </div>
                  <div className="Dashboard__Card__unconfirmedUserAdminActions">
                    <span
                      className="Dashboard__Card__unconfirmedUserAdminActions--reject"
                      onClick={() => rejectUser(unconfirmedUser._id)}
                    >
                      Rechazar
                    </span>
                    <span
                      className="Dashboard__Card__unconfirmedUserAdminActions--accept"
                      onClick={() => acceptUser(unconfirmedUser._id)}
                    >
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

AdminNewUserAlert.propTypes = {
  unconfirmed: PropTypes.array,
  acceptUser: PropTypes.func.isRequired,
  rejectUser: PropTypes.func.isRequired
};

export default AdminNewUserAlert;
