import React, { Component } from 'react';
import Title from '../../Elements/Title';
import Button from '../../Elements/Button';
import './LoginCard.styl';

export default class Login extends Component {
  render() {
    return (
      <section id="login">
        <Title>INGRESAR</Title>
        <div className="login__subtitle">
          <i className="fa fa-info-circle text-secondary" />
          &nbsp; Para registarte o para ingresar al sitio tenés dos opciones:
          usar tu cuenta de Google o la de Facebook.
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
