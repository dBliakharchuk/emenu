import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getCategoryEntities } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import {getSession} from "app/shared/reducers/authentication";
import {IDish} from "app/shared/model/dish.model";
export interface ICategoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICategoryState = IPaginationBaseState;

export class Category extends React.Component<ICategoryProps, ICategoryState> {
  state: ICategoryState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
    this.props.getRestaurantEntities();
    this.props.getMenuEntities();
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
      const { categoryList, match, totalItems, menuList, restaurantList, account } = this.props;
      let isAdmin = false;
      let isUser = false;
      let finalListOfCategories : ReadonlyArray<ICategory> = [];
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
          finalListOfCategories = categoryList;
      } else if (isUser) {
          restaurantList.filter(restaurant => account.id === restaurant.userId).map( restaurant => {
              menuList.filter( menu => restaurant.id === menu.restaurantId).map( menu => {
                  finalListOfCategories = finalListOfCategories.concat(categoryList.filter(( category => menu.id === category.menuId)));
              })
          })
      }

    return (
      <div>
        <h2 id="category-heading">
          <Translate contentKey="emenuApp.category.home.title">Categories</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.category.home.createLabel">Create new Category</Translate>
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
                  <Translate contentKey="emenuApp.category.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  <Translate contentKey="emenuApp.category.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="emenuApp.category.menu">Menu</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {finalListOfCategories.map((category, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${category.id}`} color="link" size="sm">
                      {category.id}
                    </Button>
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.menuIdMenu ? <Link to={`menu/${category.menuId}`}>{category.menuIdMenu}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${category.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${category.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${category.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ category, authentication, restaurant, menu }: IRootState) => ({
  categoryList: category.entities,
  totalItems: category.totalItems,
    account: authentication.account,
    restaurantList: restaurant.entities,
    menuList: menu.entities,
});

const mapDispatchToProps = {
  getEntities: getCategoryEntities,
    getSession,
    getRestaurantEntities,
    getMenuEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
