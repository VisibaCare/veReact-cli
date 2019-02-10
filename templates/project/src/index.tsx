import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './ui/components/App';

/**
 * Application renderer.
 */
const render = (Component: React.FunctionComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
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
 * Setups Hot Module Replacement (HMR) in development.
 */
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./ui/components/App', () => {
    console.log(`[HMR] update`);

    // Temporary solution of a bug.
    // The timeout is here because of a weird issue with react-hot-loader in 
    // combination with ve-react-cli.

    // The issue is that the accept function seems to be called before it's 
    // supposed to, causing the application to slack behind with one hot module.

    // By moving the render function one tick ahead in the event loop, it'll 
    // render with the new hot module.

    // If anyone know why this happens, and know the solution, please make a PR! 😅
    setTimeout(() => render(App));
  });
}

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
