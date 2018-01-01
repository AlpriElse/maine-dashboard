import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/app';
import Home from './views/home';
import NotFound from './views/notFound';
import Login from './views/login';
import Signup from './views/signup';
import ScheduleEditor from './views/scheduleEditor';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/scheduleEditor" component={ScheduleEditor} />
    <Route path='/*' component={NotFound} />
  </Route>
);
