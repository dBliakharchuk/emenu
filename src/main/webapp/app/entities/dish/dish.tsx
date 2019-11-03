import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getDishEntities } from './dish.reducer';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { getSession } from "app/shared/reducers/authentication";

import { IDish } from 'app/shared/model/dish.model';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDishProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDishState = IPaginationBaseState;

export class Dish extends React.Component<IDishProps, IDishState> {
  state: IDishState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
    this.props.getRestaurantEntities();
    this.props.getMenuEntities();
    this.props.getCategoryEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { dishList, match, totalItems, restaurantList, menuList, categoryList, account } = this.props;
      let isAdmin = false;
      let isUser = false;
      let finalListOfDishes : ReadonlyArray<IDish> = [];

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
          finalListOfDishes = dishList;
      } else if (isUser) {
          restaurantList.filter(restaurant => account.id === restaurant.userId).map( restaurant => {
              menuList.filter( menu => restaurant.id === menu.restaurantId).map( menu => {
                  categoryList.filter(( category => menu.id === category.menuId)).map( category => {
                      finalListOfDishes = finalListOfDishes.concat(dishList.filter(dish => dish.categoryId === category.id));
                  })
              })
          })
      }

    return (
      <div>
        <h2 id="dish-heading">
          <Translate contentKey="emenuApp.dish.home.title">Dishes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.dish.home.createLabel">Create new Dish</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="emenuApp.dish.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  <Translate contentKey="emenuApp.dish.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('price')}>
                  <Translate contentKey="emenuApp.dish.price">Price</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('image')}>
                  <Translate contentKey="emenuApp.dish.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.category">Category</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.ingeredientToDish">Ingeredient To Dish</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {finalListOfDishes !== undefined && finalListOfDishes.map((dish, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dish.id}`} color="link" size="sm">
                      {dish.id}
                    </Button>
                  </td>
                  <td>{dish.name}</td>
                  <td>{dish.description}</td>
                  <td>{dish.price}</td>
                  <td>
                    {dish.image ? (
                      <div>
                        <a onClick={openFile(dish.imageContentType, dish.image)}>
                          <img src={`data:${dish.imageContentType};base64,${dish.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {dish.imageContentType}, {byteSize(dish.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{dish.categoryIdCategory ? <Link to={`category/${dish.categoryId}`}>{dish.categoryIdCategory}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dish.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dish.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dish.id}/delete`} color="danger" size="sm">
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
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ dish, restaurant, menu, category, authentication }: IRootState) => ({
  dishList: dish.entities,
  totalItems: dish.totalItems,
  account: authentication.account,
  restaurantList: restaurant.entities,
  menuList: menu.entities,
  categoryList: category.entities
});

const mapDispatchToProps = {
  getEntities: getDishEntities,
  getSession,
  getCategoryEntities,
  getRestaurantEntities,
  getMenuEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dish);
