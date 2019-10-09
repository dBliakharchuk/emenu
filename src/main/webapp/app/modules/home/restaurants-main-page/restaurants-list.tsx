import './search-style.css';

import React, { Component } from 'react';
import RestaurantComponent from './RestaurantComponent';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { connect } from 'react-redux';

import { getUsers, updateUser } from 'app/modules/administration/user-management/user-management.reducer';
import { getSession, login } from 'app/shared/reducers/authentication';
import { AUTHORITIES } from 'app/config/constants';
import Loader from 'app/modules/home/restaurants-main-page/loader.gif';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRestaurantState extends IPaginationBaseState {
  queryNameOfRes: string;
  queryLocationOfRes: string;
  results: object;
  loading: boolean;
  message: string;
}

/* Filter function for searching Restaurant name */
function searchingFor(queryNameOfRes, queryLocationOfRes) {
  return function(x) {
    if (x != null) {
      return (
        (x.name.toLowerCase().includes(queryNameOfRes.toLowerCase()) || !queryNameOfRes) &&
        x.description.toLowerCase().includes(queryLocationOfRes.toLowerCase())
      );
    } else {
      return false;
    }
  };
}

/*/!* Filter function for searching Location of restaurant*!/
function searchingForLocation(query) {
    return function (x) {
        if (x != null) {
            return x.location.toLowerCase().includes(query.toLowerCase()) || !query;
        } else {
            return '';
        }
    }
}*/

/* Main restaurants component */
export class RestaurantsList extends React.Component<IRestaurantProps, IRestaurantState> {
  constructor(props) {
    super(props);

    this.state = {
      queryNameOfRes: '',
      queryLocationOfRes: '',
      results: {},
      loading: false,
      message: ''
    };

    this.handleOnInputRestaurantNameChange = this.handleOnInputRestaurantNameChange.bind(this);
    this.handleOnInputRestaurantLocationChange = this.handleOnInputRestaurantLocationChange.bind(this);
  }

  componentDidMount() {
    this.props.getEntities();
    this.props.getUsers();
    this.props.getSession();
  }

  /* Searching functions */
  fetchSearchResults = (updatedPageNo = 0, query) => {
    // const results  = this.props.restaurantList;
    const results = this.state.results;
    const resultNotFoundMsg = results.length ? 'There are no more search results. Please try a new search.' : '';

    this.setState({
      results: results,
      message: resultNotFoundMsg,
      loading: false
    });
  };

  handleOnInputRestaurantNameChange = event => {
    const query = event.target.value;

    if (!query) {
      this.setState({ queryNameOfRes: query, results: {}, message: '' });
    } else {
      this.setState({ queryNameOfRes: query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  handleOnInputRestaurantLocationChange = event => {
    const query = event.target.value;

    if (!query) {
      this.setState({ queryLocationOfRes: query, results: {}, message: '' });
    } else {
      this.setState({ queryLocationOfRes: query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  renderSearchResults = restaurantComponents => {
    //const results = this.props.restaurantList;
    //const { results } = this.state;

    if (Object.keys(restaurantComponents).length) {
      return (
        <div className="restaurants-container">
          {restaurantComponents.filter(searchingFor(this.state.queryNameOfRes, this.state.queryLocationOfRes)).map(result => {
            return <RestaurantComponent key={result.id} restaurantEnt={result} />;
          })}
        </div>
      );
    }
  };

  // get session who is logged in
  render() {
    const url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    const { restaurantList, account } = this.props;
    const { queryNameOfRes, queryLocationOfRes, message, loading } = this.state;
    let restaurantComponents = null;
    let isAdmin = false;
    let isUser = false;
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
        restaurantComponents = restaurantList.map(
          (restaurant, i) =>
            //<RestaurantComponent key={restaurant.id} restaurantEnt={restaurant} />
            restaurant
        );
      } else if (isUser) {
        restaurantComponents = restaurantList.map(function(restaurant, i) {
          if (restaurant.userId === account.id) {
            //return <RestaurantComponent key={restaurant.id} restaurantEnt={restaurant} />;
            return restaurant;
          } else {
            console.log("This restaurant isn't owned by this user!!!");
          }
        });
      } else {
        console.warn('Something went wrong, check if user or admin was registered!');
      }
    } else {
      /* console.log('ACCOUNT!!!!!' + account);
         console.log('Account session is null!!!');
      */
    }

    return (
      <div className="search-container">
        {/*Head*/}
        {/*<h2 className="search-heading">Search Engine: React</h2>*/}
        {/* Location searching */}
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={queryLocationOfRes}
            id="search-input"
            placeholder="Provide address of the restaurant"
            onChange={this.handleOnInputRestaurantLocationChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>
        {/* Restaurant name searching */}
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={queryNameOfRes}
            id="search-input"
            placeholder="Provide name of the restaurant"
            onChange={this.handleOnInputRestaurantNameChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>
        {/*Error Message*/}
        {message && <p className="message">{message}</p>}

        {/*Loader*/}
        <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />

        {this.renderSearchResults(restaurantComponents)}
      </div>
    );

    // return <SearchEngine restaurants={restaurantComponents}  />
    // return <div className="restaurants-container">{restaurantComponents}</div>;
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
  getEntities: getRestaurantEntities,
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
