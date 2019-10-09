import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Restaurant from './restaurant';
import Location from './location';
import Photo from './photo';
import Menu from './menu';
import Category from './category';
import Dish from './dish';
import Ingredient from './ingredient';
import IngredientToDish from './ingredient-to-dish';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/restaurant`} component={Restaurant} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/photo`} component={Photo} />
      <ErrorBoundaryRoute path={`${match.url}/menu`} component={Menu} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}/dish`} component={Dish} />
      <ErrorBoundaryRoute path={`${match.url}/ingredient`} component={Ingredient} />
      <ErrorBoundaryRoute path={`${match.url}/ingredient-to-dish`} component={IngredientToDish} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
