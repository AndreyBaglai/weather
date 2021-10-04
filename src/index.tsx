import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import 'config/i18n';

import 'normalize.css';
import 'sources/styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="Loading... ">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
