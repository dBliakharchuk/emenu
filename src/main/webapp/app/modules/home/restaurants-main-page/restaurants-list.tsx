import React, { Component } from 'react';
import RestaurantComponent from './RestaurantComponent';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/restaurant/restaurant.reducer';
import { connect } from 'react-redux';

import { getUsers, updateUser } from 'app/modules/administration/user-management/user-management.reducer';
import { getSession, login } from 'app/shared/reducers/authentication';
import { AUTHORITIES } from 'app/config/constants';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IRestaurantState = IPaginationBaseState;

export class RestaurantsList extends React.Component<IRestaurantProps, IRestaurantState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
    this.props.getUsers();
    this.props.getSession();
  }
  // get session who is logged in
  render() {
    const url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    const { restaurantList, account } = this.props;
    var restaurantComponents = null;
    var isAdmin = false;
    var isUser = false;
    if (account != null) {
      account.authorities.map((authority, i) => {
        if (authority === AUTHORITIES.ADMIN) {
          isAdmin = true;
        } else if (authority === AUTHORITIES.USER) {
          isUser = true;
        }
      });
      console.log('isAdmin = ' + isAdmin + '; isUser = ' + isUser);
      if (isAdmin) {
        restaurantComponents = restaurantList.map((restaurant, i) => (
          <RestaurantComponent key={restaurant.id} restaurantEnt={restaurant} />
        ));
      } else if (isUser) {
        restaurantComponents = restaurantList.map(function(restaurant, i) {
          if (restaurant.userId === account.id) {
            return <RestaurantComponent key={restaurant.id} restaurantEnt={restaurant} />;
          } else {
            console.log("This isn't restaurant owned by this user!!!");
          }
        });
      } else {
        console.log('Something went wrong, check if user or admin was registered!');
      }
    } else {
      /* console.log('ACCOUNT!!!!!' + account);
         console.log('Account session is null!!!');
      */
    }
    return <div className="restaurants-container">{restaurantComponents}</div>;
  }
}

const mapStateToProps = ({ restaurant, authentication }: IRootState) => ({
  restaurantList: restaurant.entities,
  totalItems: restaurant.totalItems,
  // users: storeState.userManagement.users,
  // account: storeState.authentication.account,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {
  getEntities,
  getUsers,
  updateUser,
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsList);
