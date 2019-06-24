import React from 'react';
import { HomeComponent } from './types';
import style from './style';

const Home: React.FC<HomeComponent.Props> = () => {
  return (
    <style.Content>
      <h1>Hello World!</h1>
    </style.Content>
  );
};

export default Home;
