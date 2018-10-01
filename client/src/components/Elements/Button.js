import React from 'react';
import styled from 'styled-components';
import { elevation } from '../Utilities';

const Button = props => {
  const { children } = props;
  const {
    backgroundColor,
    textColor,
    borderColor,
    display,
    name,
    type
  } = props;
  return (
    <ButtonWrapper
      background={backgroundColor}
      color={textColor}
      border={borderColor}
      display={display}
      name={name}
      type={type || null}
    >
      {children}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  backgroundColor: 'transparent',
  textColor: 'black',
  borderColor: 'transparent',
  display: null
};

const ButtonWrapper = styled.button`
  cursor: pointer;
  display: ${props => props.display} !important;
  border: 2px solid ${props => props.border};
  ${elevation[3]};
  border-radius: 5px;
  line-height: 1.5rem;
  color: ${props => props.color};
  width: 220px;
  background-color: ${props => props.background};
  font-size: 1.2rem;
  @media screen and (max-width: 768px) {
    display: block;
    padding: 0.8rem 1.8rem;
    width: 180px;
  }
  @media screen and (min-width: 769px) {
    padding: 0.8rem;
    display: inline-block;
  }
  &:hover {
    transform: scale(1.01);
    transform: translateY(-1px);
    transition: all 0.2s ease;
    ${elevation[2]};
  }
  &:active {
    transform: scale3d(0.98, 0.98, 0.98);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateY(1px);
    ${elevation[1]};
  }
`;

export default Button;
