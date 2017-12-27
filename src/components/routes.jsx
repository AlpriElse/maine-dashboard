import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/app';
import Home from './views/home';
import NotFound from './views/notFound';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='*' component={NotFound} />
  </Route>
);
