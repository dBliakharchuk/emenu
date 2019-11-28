import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
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
