import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './restaurant.reducer';
import { IRestaurant } from 'app/shared/model/restaurant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Restaurant extends React.Component<IRestaurantProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { restaurantList, match } = this.props;
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
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.restaurant.idRestaurant">Id Restaurant</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.restaurant.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.restaurant.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.restaurant.idRestaurant">Id Restaurant</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.restaurant.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {restaurantList.map((restaurant, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${restaurant.id}`} color="link" size="sm">
                      {restaurant.id}
                    </Button>
                  </td>
                  <td>{restaurant.idRestaurant}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.description}</td>
                  <td>
                    {restaurant.idRestaurant ? <Link to={`location/${restaurant.idRestaurant.id}`}>{restaurant.idRestaurant.id}</Link> : ''}
                  </td>
                  <td>{restaurant.user ? restaurant.user.idUser : ''}</td>
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
      </div>
    );
  }
}

const mapStateToProps = ({ restaurant }: IRootState) => ({
  restaurantList: restaurant.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
