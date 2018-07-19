import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Root } from 'router/router';
import { store } from './store';
import { history } from './router/history';
import 'assets/styles/typography.css';
import 'assets/styles/general.css';

render(
  <Root store={ store } history={ history } />,
  document.getElementById('root')
);
