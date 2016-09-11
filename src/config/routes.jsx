import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import App from 'containers/App';
import Player from 'containers/Player';
import HomePage from 'containers/HomePage';

export default (
  <Router history={hashHistory}>
    <Route path='/' component={HomePage} />
    <Route path='/playlist' component={App}>
      <Route path=':fbid' component={Player} />
    </Route>
  </Router>
);
