import React, { Component } from 'react';
import RestaurantComponentUnlogged from './RestaurantComponentUnlogged';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { connect } from 'react-redux';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRestaurantState = IPaginationBaseState;

export class RestaurantsListUnlogged extends React.Component<IRestaurantProps, IRestaurantState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { restaurantList } = this.props;

    const url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    const restaurantComponents = restaurantList.map((restaurant, i) => (
      <RestaurantComponentUnlogged key={restaurant.id} restaurantEnt={restaurant} />
    ));

    return <div className="restaurants-container">{restaurantComponents}</div>;
  }
}

const mapStateToProps = ({ restaurant }: IRootState) => ({
  restaurantList: restaurant.entities,
  totalItems: restaurant.totalItems
});

const mapDispatchToProps = {
  getEntities: getRestaurantEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsListUnlogged);
