import React, { Component } from 'react';
import Title from '../../Elements/Title';
import Button from '../../Elements/Button';
import './Login.styl';
import Nav from '../Home/Nav/';

export default class Login extends Component {
  render() {
    return (
      <section id="Login">
        <Nav {...this.props} />
        <Title>INGRESAR</Title>
        <div className="login__subtitle">
          <i className="fa fa-info-circle text-secondary" />
          &nbsp; ¡Ey! Tenés que ingresar con tu cuenta para poder de ver el
          contenido que solicitaste.
          <div className="login__btn-panel">
            <a href="/auth/google">
              <Button>
                <i className="fab fa-google button-icon" />
                &nbsp; Ingresar con Google
              </Button>
            </a>
            <a href="/auth/facebook">
              <Button>
                <i className="fab fa-facebook-square button-icon" />
                &nbsp; Ingresar con Facebook
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }
}
