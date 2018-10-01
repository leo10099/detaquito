import React, { Component } from 'react';

import styled from 'styled-components';

import { Portal, absolute } from '../Utilities';
import Icon from '../Elements/Icon';
import { Card } from '../Elements/Card';

export default class Modal extends Component {
  render() {
    const { children, closeButtonColor, on, toggle } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard>
              <CloseButton onClick={toggle}>
                <Icon name="close" color={closeButtonColor} />
              </CloseButton>
              {children}
            </ModalCard>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  ${absolute({})};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 769px) {
    width: 90vw;
    padding-left: 10vw;
    font-size: 1rem;
    height: 100vh;
  }
  @media screen and (max-width: 769px) and (orientation: landscape) {
    margin-top: 6rem;
  }
`;

const ModalCard = styled(Card)`
  position: relative;
  z-index: 10;
  @media screen and (max-width: 769px) {
    height: 430px;
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 769px) {
    margin-bottom: 200px;
  }
`;

const CloseButton = styled.button`
  ${absolute({
    y: 'top',
    x: 'right'
  })} border: none;
  background: transparent;
  padding: 1rem;
  cursor: pointer;
`;

const Background = styled.div`
  ${absolute({})};
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  @media screen and (max-width: 769px) {
    height: 640px;
  }
  @media screen and (max-width: 769px) and (orientation: landscape) {
    height: 640px;
    margin-top: -10rem;
  }
`;
