import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IngredientToDish from './ingredient-to-dish';
import IngredientToDishDetail from './ingredient-to-dish-detail';
import IngredientToDishUpdate from './ingredient-to-dish-update';
import IngredientToDishDeleteDialog from './ingredient-to-dish-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IngredientToDishUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IngredientToDishUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IngredientToDishDetail} />
      <ErrorBoundaryRoute path={match.url} component={IngredientToDish} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IngredientToDishDeleteDialog} />
  </>
);

export default Routes;
