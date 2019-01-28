import React from 'react';
import Loadable from 'react-loadable';

function Loading(props: Loadable.LoadingComponentProps) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>loading</div>;
  } else {
    return null;
  }
}

const LoadableComponent = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
  delay: 300,
  timeout: 500,
});

export default LoadableComponent;
