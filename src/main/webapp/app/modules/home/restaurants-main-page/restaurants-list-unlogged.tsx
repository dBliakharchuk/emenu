import './search-style.css';

import React from 'react';
import RestaurantComponentUnlogged from './RestaurantComponentUnlogged';
import { RouteComponentProps } from 'react-router';
import { IRootState } from 'app/shared/reducers';
import { getRestaurantEntities } from 'app/entities/restaurant/restaurant.reducer';
import { getLocationEntities } from 'app/entities/location/location.reducer';
import { connect } from 'react-redux';

export interface IRestaurantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRestaurantState {
  queryNameOfRes: string;
  queryLocationOfRes: string;
  results: any;
  locationsRes: any;
  loading: boolean;
  message: string;
}

/* Filter function for searching Restaurant name */
function searchingFor(queryNameOfRes) {
  return x => {
    if (x != null) {
      return x.name.toLowerCase().includes(queryNameOfRes.toLowerCase()) || !queryNameOfRes;
    } else {
      return false;
    }
  };
}

function searchingForLocation(queryLocation) {
  return x => {
    if (x != null) {
      return x.city.toLowerCase().includes(queryLocation.toLowerCase()) || !queryLocation;
    } else {
      return false;
    }
  };
}

/* Main restaurants component */
export class RestaurantsListUnlogged extends React.Component<IRestaurantProps, IRestaurantState> {
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
  }

  /* Searching functions */
  fetchSearchResults = (updatedPageNo = 0, query) => {
    const { results } = this.state;
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

    if (queryLocationOfRes !== '' && restaurantComponents !== null) {
      finalRestaurantList = restaurantComponents.filter(restaurant => {
        return locationsRes.find(location => location.id === restaurant.idLocationId);
      });
    }

    if (restaurantComponents && Object.keys(finalRestaurantList).length) {
      return (
        <div className="restaurants-container row col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {finalRestaurantList.filter(searchingFor(this.state.queryNameOfRes)).map(result => {
            return <RestaurantComponentUnlogged key={result.id} restaurantEnt={result} />;
          })}
        </div>
      );
    }
  };

  render() {
    const { restaurantList } = this.props;
    let { queryNameOfRes, queryLocationOfRes, message } = this.state;
    let restaurantComponents = null;
    if (restaurantList) {
      restaurantComponents = restaurantList.map(restaurant => restaurant);
    } else {
      console.warn('Something went wrong, check if user or admin was registered!');
    }

    return (
      <div className="row">
        <div className="search-container col-xs-12 col-sm-12 col-md-12 ">
          <label className="search-label col-xs-12 col-sm-12 col-md-12" htmlFor="search-input">
            <input
              type="text"
              name="query"
              value={queryLocationOfRes}
              id="search-input"
              placeholder="Search by ADDRESS of the restaurant"
              onChange={this.handleOnInputRestaurantLocationChange}
            />
            <i className="fa fa-search search-icon" aria-hidden="true" />
          </label>
          {/* Restaurant name searching */}
          <label className="search-label col-xs-12 col-sm-12 col-md-12" htmlFor="search-input">
            <input
              type="text"
              name="query"
              value={queryNameOfRes}
              id="search-input"
              placeholder="Search by NAME of the restaurant"
              onChange={this.handleOnInputRestaurantNameChange}
            />
            <i className="fa fa-search search-icon" aria-hidden="true" />
          </label>

          <h1 className="list-restaurants-title col-xs-12 col-sm-12 col-md-12">
            List of restaurants in <u>{queryLocationOfRes !== '' ? queryLocationOfRes : 'the application'} </u>
          </h1>
          {/*Error Message*/}
          {message && <p className="message col-xs-12 col-sm-12 col-md-12">{message}</p>}

          {/*Loader*/}
          {/*<img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'} col-xs-12 col-sm-12 col-md-12`} alt="loader" />*/}

          {this.renderSearchResults(restaurantComponents)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ restaurant, location }: IRootState) => ({
  restaurantList: restaurant.entities,
  totalItems: restaurant.totalItems,
  locationList: location.entities
});

const mapDispatchToProps = {
  getEntities: getRestaurantEntities,
  getLocationEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsListUnlogged);
