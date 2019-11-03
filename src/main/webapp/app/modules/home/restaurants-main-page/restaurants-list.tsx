import './search-style.css';

import React, { Component } from 'react';
import RestaurantComponent from './RestaurantComponent';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { getLocationEntities } from 'app/entities/location/location.reducer';
import { connect } from 'react-redux';

import { getUsers, updateUser } from 'app/modules/administration/user-management/user-management.reducer';
import { getSession, login } from 'app/shared/reducers/authentication';
import { AUTHORITIES } from 'app/config/constants';
import Loader from 'app/modules/home/restaurants-main-page/loader.gif';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRestaurantState extends IPaginationBaseState {
  queryNameOfRes: string;
  queryLocationOfRes: string;
  results: any;
  locationsRes: any,
  loading: boolean;
  message: string;
}

/* Filter function for searching Restaurant name */
function searchingFor(queryNameOfRes) {
  return function(x) {
    if (x != null) {
      return (
        (x.name.toLowerCase().includes(queryNameOfRes.toLowerCase()) || !queryNameOfRes)
      );
    } else {
      return false;
    }
  };
}

function searchingForLocation(queryLocation) {
    return function(x) {
        if (x != null) {
            return (
                (x.city.toLowerCase().includes(queryLocation.toLowerCase()) || !queryLocation)
            );
        } else {
            return false;
        }
    };
}

/* Main restaurants component */
export class RestaurantsList extends React.Component<IRestaurantProps, IRestaurantState> {
  constructor(props) {
    super(props);

    this.state = {
      queryNameOfRes: '',
      queryLocationOfRes: '',
      results: [],
      locationsRes: [],
      loading: false,
      message: ''
    };

    this.handleOnInputRestaurantNameChange = this.handleOnInputRestaurantNameChange.bind(this);
    this.handleOnInputRestaurantLocationChange = this.handleOnInputRestaurantLocationChange.bind(this);
  }

  componentDidMount() {
    this.props.getLocationEntities();
    this.props.getEntities();
    this.props.getUsers();
    this.props.getSession();
  }

  /* Searching functions */
  fetchSearchResults = (updatedPageNo = 0, query) => {
    const { results, locationsRes} = this.state;
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
      this.setState({ queryNameOfRes: query, results: [], message: '' });
    } else {
      this.setState({ queryNameOfRes: query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  handleOnInputRestaurantLocationChange = event => {
    const query = event.target.value;
    let locationList = this.props.locationList.filter(searchingForLocation(query));

    if (!query) {
        this.setState({ queryLocationOfRes: '', locationsRes: locationList, message: '' });
    } else {
      this.setState({ queryLocationOfRes: query, locationsRes: locationList, loading: true, message: '' }, () => {
            this.fetchSearchResults(1, query);
      });
    }
  };

  renderSearchResults = restaurantComponents => {
      const { locationsRes, queryLocationOfRes } = this.state;
      let finalRestaurantList = restaurantComponents;

      if (queryLocationOfRes !== ''){
          finalRestaurantList = restaurantComponents.filter(restaurant => {
              return (locationsRes.find(location => location.id === restaurant.idLocationId));
          });
      }

    if (Object.keys(finalRestaurantList).length) {
      return (
        <div className="restaurants-container">
          {finalRestaurantList.filter(searchingFor(this.state.queryNameOfRes)).map(result => {
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
    let { queryNameOfRes, queryLocationOfRes, message, loading, results } = this.state;
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
      if (isAdmin) {
        restaurantComponents = restaurantList;
      } else if (isUser) {
        restaurantComponents = restaurantList.map((restaurant, i) => {
          if (restaurant.userId === account.id) {
            return restaurant;
          } else {
            console.warn("This restaurant isn't owned by this user!!!");
          }
        });
      } else {
        console.warn('Something went wrong, check if user or admin was registered!');
      }
    } else {
         console.warn('Account session is null!!!');
    }

    return (
        <div>
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

                <h1 className="list-restaurants-title">List of restaurants in <u>{ queryLocationOfRes !== '' ? queryLocationOfRes : 'the application'} </u></h1>
                {/*Error Message*/}
                {message && <p className="message">{message}</p>}

                {/*Loader*/}
                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />

                {this.renderSearchResults(restaurantComponents)}
            </div>
        </div>
    );

  }
}

const mapStateToProps = ({ restaurant, authentication, location }: IRootState) => ({
  restaurantList: restaurant.entities,
  totalItems: restaurant.totalItems,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  locationList: location.entities
});

const mapDispatchToProps = {
  getEntities: getRestaurantEntities,
  getUsers,
  updateUser,
  getSession,
  getLocationEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsList);
