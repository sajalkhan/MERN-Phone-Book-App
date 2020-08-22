import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'semantic-ui-css/semantic.min.css';

//Redux
import { Provider } from 'react-redux';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
