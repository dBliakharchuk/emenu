import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getIngredientsEntities, reset } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getDishEntities } from 'app/entities/dish/dish.reducer';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { getSession } from "app/shared/reducers/authentication";
import { getRestaurantEntities, getRestaurantEntity} from "app/entities/restaurant/restaurant.reducer";
import { getIngredientsToDishEntities } from 'app/entities/ingredient-to-dish/ingredient-to-dish.reducer';
import {IIngredientToDish} from "app/shared/model/ingredient-to-dish.model";

export interface IIngredientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IIngredientState = IPaginationBaseState;

export class Ingredient extends React.Component<IIngredientProps, IIngredientState> {
  state: IIngredientState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
      this.props.getRestaurantEntities();
      this.props.getMenuEntities();
      this.props.getCategoryEntities();
      this.props.getDishEntities();
      this.props.getIngredientsToDishEntities();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
      const { ingredientList, ingredientToDishList, dishList, match, restaurantList, menuList, categoryList, account } = this.props;
      let isAdmin = false;
      let isUser = false;
      let finalIngredientList : ReadonlyArray<IIngredient> = [];

      if (account != null) {
          account.authorities.map((authority, i) => {
              if (authority === AUTHORITIES.ADMIN) {
                  isAdmin = true;
              } else if (authority === AUTHORITIES.USER) {
                  isUser = true;
              }
          });
      }

      if (isAdmin) {
          finalIngredientList = ingredientList;
      } else if (isUser) {
          restaurantList.filter(restaurant => account.id === restaurant.userId).map( restaurant => {
              menuList.filter( menu => restaurant.id === menu.restaurantId).map( menu => {
                  categoryList.filter(( category => menu.id === category.menuId)).map( category => {
                      dishList.filter( dish => dish.categoryId === category.id).map(dish => {
                          ingredientToDishList.filter(iTd => dish.id === iTd.toDishId).map(iTd => {
                              finalIngredientList = finalIngredientList.concat(ingredientList.filter(ingredient =>
                                  ingredient.id === iTd.toIngredientId ));
                          });
                      });
                  })
              })
          })
      }
    return (
      <div>
        <h2 id="ingredient-heading">
          <Translate contentKey="emenuApp.ingredient.home.title">Ingredients</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.ingredient.home.createLabel">Create new Ingredient</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="emenuApp.ingredient.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isAllergic')}>
                    <Translate contentKey="emenuApp.ingredient.isAllergic">Is Allergic</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ingredientList.map((ingredient, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ingredient.id}`} color="link" size="sm">
                        {ingredient.id}
                      </Button>
                    </td>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.isAllergic ? 'true' : 'false'}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ingredient.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ingredient.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ingredient.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ingredient, photo, restaurant, dish, menu, category, authentication, ingredientToDish }: IRootState) => ({
  ingredientList: ingredient.entities,
  totalItems: ingredient.totalItems,
  links: ingredient.links,
  entity: ingredient.entity,
  updateSuccess: ingredient.updateSuccess,
    photoList: photo.entities,
    restaurantList: restaurant.entities,
    dishList: dish.entities,
    menuList: menu.entities,
    categoryList: category.entities,
    account: authentication.account,
    ingredientToDishList: ingredientToDish.entities
});

const mapDispatchToProps = {
  getEntities: getIngredientsEntities,
  reset,
    getDishEntities,
    getRestaurantEntities,
    getMenuEntities,
    getCategoryEntities,
    getSession,
    getIngredientsToDishEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ingredient);
