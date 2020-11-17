import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = lazy(() => import('../pages/Main'));

const Routes: React.FC = () => (
  <Suspense fallback={<div className="loader" />}>
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  </Suspense>
);

export default Routes;
