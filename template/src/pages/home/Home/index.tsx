import React from 'react';
import styled from 'styled-components';
import Icon from '../../../ui/common/Icon/index';

const Content = styled('div')<{ fontSize: number }>`
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-width: fit-content;
  justify-content: center;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize}rem;

  & svg {
    font-size: 40px;
    margin-left: 20px;
  }
`;

const Home: React.FC = () => <Content fontSize={4}>Hello world! <Icon icon='rocket' /></Content>;

export default Home;
