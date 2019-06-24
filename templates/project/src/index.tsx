import ReactDOM from 'react-dom';
import React from 'react';
import App from './ui/components/App';

const render = (Component: React.FC) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app'),
  );
};

render(App);
