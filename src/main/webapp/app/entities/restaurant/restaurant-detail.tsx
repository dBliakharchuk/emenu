import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './restaurant.reducer';
import { IRestaurant } from 'app/shared/model/restaurant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestaurantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RestaurantDetail extends React.Component<IRestaurantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { restaurantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.restaurant.detail.title">Restaurant</Translate> [<b>{restaurantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idRestaurant">
                <Translate contentKey="emenuApp.restaurant.idRestaurant">Id Restaurant</Translate>
              </span>
            </dt>
            <dd>{restaurantEntity.idRestaurant}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="emenuApp.restaurant.name">Name</Translate>
              </span>
            </dt>
            <dd>{restaurantEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="emenuApp.restaurant.description">Description</Translate>
              </span>
            </dt>
            <dd>{restaurantEntity.description}</dd>
            <dt>
              <Translate contentKey="emenuApp.restaurant.idRestaurant">Id Restaurant</Translate>
            </dt>
            <dd>{restaurantEntity.idRestaurant ? restaurantEntity.id : ''}</dd>
            <dt>
              <Translate contentKey="emenuApp.restaurant.user">User</Translate>
            </dt>
            <dd>{restaurantEntity.user ? restaurantEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/restaurant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/restaurant/${restaurantEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ restaurant }: IRootState) => ({
  restaurantEntity: restaurant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetail);
