import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntity } from 'app/entities/restaurant/restaurant.reducer';
import RestaurantHeaderUnlogged from './header/chosen-restaurant-header-unlogged';
import RestaurantBodyUnlogged from './body/chosen-restaurant-body-unlogged';

export interface IChosenRestaurantProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChosenRestaurantUnlogged extends React.Component<IChosenRestaurantProp> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { restaurantEntity } = this.props;
    return (
      <div>
        <RestaurantHeaderUnlogged restaurantEnt={restaurantEntity} />
        <hr />
        <RestaurantBodyUnlogged restaurantID={restaurantEntity.id} />
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
)(ChosenRestaurantUnlogged);
