import React from 'react';

import styled from 'styled-components';

export default props => {
  const { children } = props;
  return <TitleWrapper>{children}</TitleWrapper>;
};

const TitleWrapper = styled.h1`
  height: 55px;
  font-size: 2.5rem;
  text-align: center;
  margin: 0 auto;
  align-self: flex-start;
  @media screen and (max-width: 768px) {
    display: block;
    height: 45px;
    font-size: 1.8rem;
  }
`;
