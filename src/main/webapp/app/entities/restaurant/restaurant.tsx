import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  Translate,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntities, getRestaurantEntitiesByUserId } from './restaurant.reducer';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import {getSession} from "app/shared/reducers/authentication";
import {getLocationEntities} from "app/entities/location/location.reducer";

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRestaurantState = IPaginationBaseState;

export class Restaurant extends React.Component<IRestaurantProps, IRestaurantState> {
  state: IRestaurantState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
    this.props.getSession();
    this.props.getLocationEntities();
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

  findLocationById(locationID) {
    const { locationList } = this.props;
    const locationFound = locationList.find(location => (location.id == locationID));
    return (locationFound !== undefined && locationFound !== null) && locationFound.city
  }


  render() {
    const { restaurantList, match, totalItems, account } = this.props;
    let isAdmin = false;
    let isUser = false;
    let finalListOfRes : ReadonlyArray<IRestaurant>;

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
        finalListOfRes = restaurantList;
    } else if (isUser) {
        finalListOfRes = restaurantList.filter( restaurant => account.id === restaurant.userId);
    }

    return (
      <div>
        <h2 id="restaurant-heading">
          <Translate contentKey="emenuApp.restaurant.home.title">Restaurants</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.restaurant.home.createLabel">Create new Restaurant</Translate>
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
                  <Translate contentKey="emenuApp.restaurant.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  <Translate contentKey="emenuApp.restaurant.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('image')}>
                  <Translate contentKey="emenuApp.restaurant.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*<th className="hand" onClick={this.sort('googleMapsLink')}>
                  <Translate contentKey="emenuApp.restaurant.googleMapsLink">Google Maps Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tripAdvisorLink')}>
                  <Translate contentKey="emenuApp.restaurant.tripAdvisorLink">Trip Advisor Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('webPageLink')}>
                  <Translate contentKey="emenuApp.restaurant.webPageLink">Web Page Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>*/}
                <th>
                  <Translate contentKey="emenuApp.restaurant.idLocation">Location</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                  {isAdmin &&
                    <th>
                        <Translate contentKey="emenuApp.restaurant.user">ID User</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                  }
                <th />
              </tr>
            </thead>
            <tbody>
              {finalListOfRes.map((restaurant, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${restaurant.id}`} color="link" size="sm">
                      {restaurant.id}
                    </Button>
                  </td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.description}</td>
                  <td>
                    {restaurant.image ? (
                      <div>
                        <a onClick={openFile(restaurant.imageContentType, restaurant.image)}>
                          <img src={`data:${restaurant.imageContentType};base64,${restaurant.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {restaurant.imageContentType}, {byteSize(restaurant.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  {/*<td>{restaurant.googleMapsLink}</td>
                  <td>{restaurant.tripAdvisorLink}</td>
                  <td>{restaurant.webPageLink}</td>*/}
                  <td>
                    {restaurant.idLocationId ? <Link to={`location/${restaurant.idLocationId}`}>{ this.findLocationById(restaurant.idLocationId)}</Link> : ''}
                  </td>
                  {isAdmin && <td>{restaurant.userId ? restaurant.userId : ''}</td>}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${restaurant.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${restaurant.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${restaurant.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ restaurant, authentication, location }: IRootState) => ({
  restaurantList: restaurant.entities,
  totalItems: restaurant.totalItems,
  account: authentication.account,
  locationList: location.entities
});

const mapDispatchToProps = {
  getEntities: getRestaurantEntities,
  getSession,
  getLocationEntities,
  getRestaurantEntitiesByUserId
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
