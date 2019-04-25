import './home.css';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { Home } from 'app/modules/home/home';
import { getEntity } from 'app/entities/restaurant/restaurant.reducer';
import RestaurantHeader from './chosen-restaurant-header';
import RestaurantBody from './chosen-restaurent-body';

export interface IChosenRestaurantProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChosenRestaurant extends React.Component<IChosenRestaurantProp> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { restaurantEntity } = this.props;
    console.log('&*****************************');
    console.log(restaurantEntity);
    const url = restaurantEntity.image
      ? `data:${restaurantEntity.imageContentType};base64,${restaurantEntity.image}`
      : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0oXSyenhAhVNL1AKHV0XBcUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D34596%26picture%3Dquestion-mark&psig=AOvVaw0xg9g0Nu5CD1GypEHO8J-U&ust=1556224350196034';
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
  getEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenRestaurant);
