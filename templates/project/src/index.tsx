import ReactDOM from 'react-dom';
import React from 'react';
import App from './ui/components/App';

/**
 * Application renderer.
 */
const render = (Component: React.FunctionComponent) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app'),
  );
};

/**
 * Start up.
 */
(async () => {
  try {
    // --> pre render pipe goes here <--

    // Render application once pipe is done.
    render(App);
  } catch (error) {
    console.error(error);
  }
})();

/**
 * Installs Service Worker for production build.
 */
if (process.env.NODE_ENV === 'production') {
  const runtime = require('ve-react-cli/runtime');

  runtime.install({
    onUpdating: () => {
      console.log('SW:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW:', 'onUpdateReady');
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW:', 'onUpdated');
    },
    onUpdateFailed: () => {
      console.log('SW:', 'onUpdateFailed');
    },
  });
}
