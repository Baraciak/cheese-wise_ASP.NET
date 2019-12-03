import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AppTemplate from './AppTemplate';
import store from './_redux/store'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter basename={baseUrl}>
          <AppTemplate />
      </BrowserRouter>
  </Provider>
  , rootElement);

registerServiceWorker();

