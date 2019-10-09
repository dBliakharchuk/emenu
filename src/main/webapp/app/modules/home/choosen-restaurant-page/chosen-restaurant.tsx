import 'app/modules/home/css/home.css';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { Home } from 'app/modules/home/restaurants-main-page/home';
import { getRestaurantEntity } from 'app/entities/restaurant/restaurant.reducer';
import RestaurantHeader from './header/chosen-restaurant-header';
import RestaurantBody from './body/chosen-restaurent-body';

export interface IChosenRestaurantProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChosenRestaurant extends React.Component<IChosenRestaurantProp> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { restaurantEntity } = this.props;
    return (
      <div>
        <RestaurantHeader restaurantEnt={restaurantEntity} />
        <hr />
        <RestaurantBody restaurantID={restaurantEntity.id} />
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ restaurant }: IRootState) => ({
  restaurantEntity: restaurant.entity
});

const mapDispatchToProps = {
  getEntity: getRestaurantEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenRestaurant);
