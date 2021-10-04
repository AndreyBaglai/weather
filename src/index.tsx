import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import 'normalize.css';
import 'sources/styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
