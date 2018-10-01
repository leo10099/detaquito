import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { fetchUser } from '../../../global/actions/auth/';
import { fetchAllTeamsNames } from '../../../global/actions/team/';
import { colors } from '../../Utilities';

import 'toastr/build/toastr.min.css';
import Nav from '../../Layout/Home/Nav/';
import { Title, Card, Button } from '../../Elements/';

import './Account.styl';

// Toastr options
toastr.options.hideDuration = false;
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;
toastr.options.timeOut = 4000;
toastr.options.positionClass = 'toast-top-right';

export class Account extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    team: PropTypes.array
  };

  state = {
    fileSelected: null,
    feedback: '',
    newAvatarUrl: '',
    uploading: false,
    loading: true,
    allowToContinue: false
  };

  // Life-cycle
  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchAllTeamsNames();
    this.setState({ loading: false });
  }

  // Custom Events

  handleFileSelected = file => {
    this.setState({ fileSelected: file[0].name });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { value: alias } = event.target.alias;
    const { value: fav_team } = event.target.fav_team;
    const avatarImg = event.target.avatar.files[0] || undefined;

    // Si se subio un avatar, enviarlo y actualizar el perfil
    if (this.state.fileSelected && avatarImg) {
      if (
        avatarImg.type.includes('jpeg') ||
        avatarImg.type.includes('jpg') ||
        avatarImg.type.includes('png') ||
        avatarImg.type.includes('gif')
      ) {
        const newUserData = new FormData();
        newUserData.append('avatar', avatarImg);
        // Mostrar spinner
        this.setState({ uploading: true });
        // Enviar avatar
        const response = await axios.post(
          '/api/update/user/avatar',
          newUserData
        );
        if (response) {
          // Mostrar feedback y remover spinner
          await this.setState({ uploading: false });
          await this.setState({ allowToContinue: true });
          toastr.success('Se modificó tu avatar');
          console.log(response);
          this.setState({
            fileSelected: '',
            newAvatarUrl: response.data.newUser.avatar,
            uploading: false
          });
        }
      } else {
        toastr.error(
          'Sólo se permiten imágenes en los formatos: JPG, GIF o PNG'
        );
      }
    }
    // Si se modificó el nombre de usuario o el equipo favorito, actualizar el perfil
    if (
      alias !== this.props.auth.alias ||
      fav_team !== String(this.props.auth.fav_team)
    ) {
      // Mostrar spinner
      this.setState({ uploading: true });
      // Enviar nuevos datos del usuario
      const newUserData = { alias, fav_team };

      axios
        .post('/api/update/user/data/', newUserData)
        .then(response => {
          // Mostrar feedback y remover spinner
          toastr.success(response.data.data);
          this.setState({ uploading: false });
          this.setState({ allowToContinue: true });
        })
        .catch(e => {
          if (e.response.data.message.startsWith('E11000')) {
            this.setState({ uploading: false });
            return toastr.error(
              'El usuario ya se encuentra en uso, por favor elegí otro'
            );
          } else {
            this.setState({ uploading: false });
            return toastr.error(
              'Error al guardar tus datos,  por favor intentá más tarde'
            );
          }
        });
    }
  };

  //Render
  render() {
    const { auth, team } = this.props;
    const {
      loading,
      uploading,
      fileSelected,
      newAvatarUrl,
      allowToContinue
    } = this.state;

    return (
      <section id="Account">
        <Nav {...this.props} />
        <div className="account__container">
          <Title>MI CUENTA</Title>
        </div>
        {loading && (
          <PulseLoader
            color={colors.white}
            sizeUnit="rem"
            size={0.8}
            className="account__loader"
          />
        )}
        {!loading && (
          <section id="Account-Form">
            <div className="account-form__container">
              <Card>
                {!auth.alias && (
                  <span className="account__feedback">
                    Ya casi estamos. Por favor, completá tu registro para
                    participar del Prode
                  </span>
                )}
                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="alias" className="label-inline">
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      minLength="4"
                      maxLength="18"
                      defaultValue={auth ? auth.alias : ''}
                      name="alias"
                      required
                    />
                    <span className="info">
                      <i className="fa fa-info-circle text-secondary baseline" />
                      &nbsp; Con este alias figurás en los Rankings y Torneos
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="favTeam" className="label-inline">
                      Tu equipo
                    </label>
                    {auth &&
                      team && (
                        <select
                          name="fav_team"
                          defaultValue={auth.fav_team ? auth.fav_team : false}
                        >
                          {team &&
                            team.length > 0 &&
                            team.map(equipo => (
                              <option key={equipo._id} value={equipo._id}>
                                {equipo.name}
                              </option>
                            ))}
                          <option value="">Otro/Ninguno</option>
                        </select>
                      )}
                    <span className="info">
                      <i className="fa fa-info-circle text-secondary baseline" />
                      &nbsp; Si no subís un avatar, figarará el escudo de tu
                      club en su lugar.
                    </span>
                  </div>
                  <div className="form-group avatar__container">
                    <label htmlFor="Avatar">Avatar</label>
                    <div>
                      {(newAvatarUrl || auth.avatar) && (
                        <img
                          src={newAvatarUrl || auth.avatar}
                          className="account__avatar"
                          alt="Avatar"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      id="Avatar"
                      name="avatar"
                      className="input-file"
                      accept="image/gif, image/jpg, image/png"
                      onChange={e => this.handleFileSelected(e.target.files)}
                    />
                    <label htmlFor="Avatar">
                      <small>Elegir Imágen</small>{' '}
                    </label>
                    {fileSelected && (
                      <div className="info-container">
                        <span className="info file-selected">
                          <i className="fa fa-info-circle text-secondary baseline" />
                          &nbsp; "
                          {fileSelected.length > 30
                            ? `${fileSelected.slice(0, 30)}${fileSelected.slice(
                                -6
                              )}`
                            : fileSelected}
                          "
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="account__button-container">
                    <Button
                      type="submit"
                      backgroundColor={colors.primary}
                      textColor={colors.white}
                    >
                      {uploading ? (
                        <PulseLoader
                          sizeUnit="rem"
                          color={'whitesmoke'}
                          size={0.5}
                        />
                      ) : (
                        'Guardar'
                      )}
                    </Button>
                    {allowToContinue && (
                      <Link
                        to="/dashboard"
                        className="account__continue__button"
                      >
                        <Button
                          backgroundColor={colors.secondary}
                          textColor={colors.dark}
                        >
                          Pronosticar
                        </Button>
                      </Link>
                    )}
                  </div>
                </form>
              </Card>
            </div>
          </section>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ auth, team }) => {
  return { auth, team };
};

export default connect(
  mapStateToProps,
  { fetchUser, fetchAllTeamsNames }
)(Account);
