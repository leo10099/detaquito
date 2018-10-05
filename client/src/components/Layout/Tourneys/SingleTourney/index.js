import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { colors } from "../../../Utilities";
import { Card } from "../../../Elements";
import axios from "axios";

import "./SingleTourney.styl";

class SingleTourney extends Component {
  componentDidMount = async () => {
    await this.fetchTourneyDetails();

    // Encontrar las fechas que se van a competir en el Torneo y armar un array con ese rango
    const rounds_to_compute = this.roundsToCompute(
      25,
      this.state.t.start_on_round,
      this.props.conf.round
    );
    // Traer todos los resultados de los miembros dentro de las fechas que se disputa este Torneo.
    rounds_to_compute.map(round => {
      return this.state.t.users.map(user => {
        return axios
          .get(`/api/fetch/scores/${round}/${user._id}`)
          .then(response => {
            this.setState(
              {
                member_scores: [...this.state.member_scores, response.data]
              },
              () => {
                // Si ya se trajeron todos detalles de los usuarios, re ordenarlos
                if (
                  this.state.member_scores &&
                  this.state.t.users &&
                  this.state.member_scores.length === this.state.t.users.length
                ) {
                  return this.reorderByTotal(this.state.member_scores);
                }
              }
            );
          });
      });
    });
  };

  state = {
    t: null,
    show: "total",
    member_scores: [],
    members_sorted: [],
    isLoading: true
  };

  roundsToCompute(total_rounds, start_on_round, current_round) {
    let rounds_to_compute = [...Array(total_rounds).keys()];
    return rounds_to_compute.slice(start_on_round, current_round);
  }

  reorderByTotal(arrayOfMembers) {
    const newArray = arrayOfMembers.sort((a, b) => {
      return a.total < b.total ? 1 : -1;
    });
    newArray && this.setState({ members_sorted: newArray, isLoading: false });
  }

  async fetchTourneyDetails() {
    const _id = this.props.match.params.tourney;

    const tourney = await axios.get(`/api/fetch/tourney/${_id}`);
    this.setState({ t: tourney.data.tourney });
  }

  render() {
    const { t, members_sorted: members, isLoading, show } = this.state;
    return (
      <section className="Single__Tourney">
        <h1 className="dashboard__title">Mis Torneos</h1>
        <h3 className="dashboard__subtitle">{t && t.name}</h3>
        {show === "total" && !isLoading ? (
          <Fragment>
            <section className="Single__Tourney__Details">
              <Card className="Single__Tourney__Details__table">
                <div className="Single__Tourney__Details__th">Ranking</div>
                <div className="Single__Tourney__Details__th">Miembro</div>
                <div className="Single__Tourney__Details__th">Puntos</div>
                {members &&
                  members.map((member, index) => {
                    return (
                      <Fragment key={member._id}>
                        <div className="Single__Tourney__Details__td">
                          {index + 1}
                        </div>
                        <div className="Single__Tourney__Details__td">
                          {member.user.alias}
                        </div>
                        <div className="Single__Tourney__Details__td">
                          {member.total}
                        </div>
                      </Fragment>
                    );
                  })}
              </Card>
            </section>
          </Fragment>
        ) : (
          <div className="loading-container">
            <PulseLoader color={colors.white} sizeUnit="rem" size={0.8} />
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(SingleTourney));
