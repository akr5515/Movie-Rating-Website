import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import '../node_modules/font-awesome/css/font-awesome.min.css'; 

import './index.css';
import App from './App';

import axios from 'axios';
import store from './store/index';
axios.defaults.baseURL='http://127.0.0.1:8000/api/';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

