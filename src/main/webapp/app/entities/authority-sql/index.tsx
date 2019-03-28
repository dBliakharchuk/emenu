import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AuthoritySql from './authority-sql';
import AuthoritySqlDetail from './authority-sql-detail';
import AuthoritySqlUpdate from './authority-sql-update';
import AuthoritySqlDeleteDialog from './authority-sql-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AuthoritySqlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AuthoritySqlUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AuthoritySqlDetail} />
      <ErrorBoundaryRoute path={match.url} component={AuthoritySql} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AuthoritySqlDeleteDialog} />
  </>
);

export default Routes;
