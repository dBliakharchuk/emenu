import 'app/modules/home/css/dish-style.css';

import React from 'react';
import { getDishEntities } from 'app/entities/dish/dish.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import { getIngredientById, getIngredientsEntities } from 'app/entities/ingredient/ingredient.reducer';
import { getIngredientsToDishEntities } from 'app/entities/ingredient-to-dish/ingredient-to-dish.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IBaseMenuProps } from 'app/modules/home/choosen-restaurant-page/body/new.IState';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IDish } from 'app/shared/model/dish.model';
import { AUTHORITIES } from 'app/config/constants';
import DishComponent from 'app/modules/home/choosen-restaurant-page/body/DishComponent';

export interface IDishProps extends StateProps, IBaseMenuProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDishState {
  currentImage: number;
  lightboxIsOpen: boolean;
  querySearch: string;
  results: any;
  dishesByRestaurant: any;
  loading: boolean;
  message: string;
}

/* Filter function for searching Dish name and ingredients */
function searchingForDishesByIng(ingredientsList, iTdList) {
  return x => {
    return (
      iTdList.filter(iTdElement => x.id === iTdElement.toDishId).filter(iTdElement => {
        return ingredientsList.filter(ingredient => ingredient.id === iTdElement.toIngredientId).length > 0;
      }).length > 0
    );
  };
}

function searchingFor(querySearch) {
  return x => {
    if (x != null) {
      return x.name.toLowerCase().includes(querySearch.toLowerCase()) || !querySearch;
    } else {
      return false;
    }
  };
}

class DishList extends React.Component<IDishProps, IDishState> {
  state: IDishState = {
    currentImage: 0,
    lightboxIsOpen: false,
    querySearch: '',
    results: [],
    dishesByRestaurant: [],
    loading: false,
    message: ''
  };

  constructor(props) {
    super(props);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.renderDishListByPointerPosition = this.renderDishListByPointerPosition.bind(this);
  }

  componentDidMount() {
    this.props.getCategoryEntities();
    this.props.getEntities();
    this.props.getIngredientsToDishEntities();
    this.props.getIngredientsEntities();
    this.props.getMenuEntities();
    this.props.getSession();

    this.renderDishListByPointerPosition();
    this.findDishesByChosenRestaurant();
  }

  componentDidUpdate(prevProps) {
    const { menuPointerPosition, categoryPointerPosition, chosenRestaurantId } = this.props;
    if (
      prevProps.chosenRestaurantId !== chosenRestaurantId ||
      prevProps.menuPointerPosition !== menuPointerPosition ||
      prevProps.categoryPointerPosition !== categoryPointerPosition
    ) {
      this.renderDishListByPointerPosition();
    }
    if (prevProps.chosenRestaurantId !== chosenRestaurantId) {
      this.findDishesByChosenRestaurant();
    }
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  findDishesByChosenRestaurant() {
    const { dishList, categoryList, menuList, chosenRestaurantId } = this.props;
    let dishesByRestaurant: IDish[] = [];
    menuList.filter(menu => menu.restaurantId === chosenRestaurantId).map(menu => {
      categoryList.filter(category => category.menuId === menu.id).map(category => {
        dishesByRestaurant = dishesByRestaurant.concat(dishList.filter(dish => category.id === dish.categoryId));
      });
    });
    this.setState({
      dishesByRestaurant: dishesByRestaurant
    });

    return dishesByRestaurant;
  }

  renderDishListByPointerPosition() {
    const { menuPointerPosition, categoryPointerPosition, dishList, categoryList } = this.props;
    let chosenDishesByPointer = [];
    if (categoryPointerPosition === 0 && menuPointerPosition === 0) {
      chosenDishesByPointer = this.findDishesByChosenRestaurant();
    } else if (categoryPointerPosition === 0 && menuPointerPosition !== 0) {
      categoryList.filter(category => category.menuId === menuPointerPosition).map(category => {
        chosenDishesByPointer = chosenDishesByPointer.concat(dishList.filter(dish => category.id === dish.categoryId));
      });
    } else if (categoryPointerPosition !== 0) {
      chosenDishesByPointer = dishList.filter(dish => {
        return categoryPointerPosition === dish.categoryId;
      });
    } else {
      console.warn('Menu is empty!!!');
    }

    this.setState({
      results: chosenDishesByPointer,
      querySearch: ''
    });
  }

  /* Search engine functions*/
  fetchSearchResults = (updatedPage = 0, query, chosenDishesByName, chosenDishesByIng) => {
    const resultNotFoundMsg = chosenDishesByIng.length ? 'There are no more results. Please try a new search.' : '';
    this.setState({
      results: chosenDishesByName.concat(chosenDishesByIng),
      message: resultNotFoundMsg,
      loading: false
    });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    const { dishesByRestaurant } = this.state;
    this.findDishesByChosenRestaurant();

    if (!query) {
      this.setState({ querySearch: query, message: '' }, () => {
        this.renderDishListByPointerPosition();
      });
    } else {
      this.setState({ querySearch: query, loading: true, message: '' }, () => {
        let chosenIngredientsList = this.props.ingredientList.filter(searchingFor(query));
        let chosenDishesByIng = dishesByRestaurant.filter(searchingForDishesByIng(chosenIngredientsList, this.props.ingredientToDishList));
        let chosenDishes = dishesByRestaurant.filter(searchingFor(query));
        this.fetchSearchResults(1, query, chosenDishes, chosenDishesByIng);
      });
    }
  };

  render() {
    const { categoryLabel, account } = this.props;
    const { querySearch, results } = this.state;
    let curLabel = this.props.categoryLabel;
    let isUnlogged = true;

    if (account !== null && account !== undefined && account.authorities !== undefined) {
      account.authorities.map(authority => {
        if (authority === AUTHORITIES.ADMIN) {
          isUnlogged = false;
        } else if (authority === AUTHORITIES.USER) {
          isUnlogged = false;
        }
      });
    }
    console.log(categoryLabel);

    return (
      <div className="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="search-container-dishes col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {!isUnlogged && (
            <div className="body-edit-buttons col-lg-12 col-md-12 col-xs-12 col-sm-11 ">
              {/*<Button tag={Link} to={`/entity/menu/${curMenuId}/edit`} color="primary" size="sm">*/}
              <Button tag={Link} to={`/entity/menu`} color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <span className="d-xs-inline">
                  Menus
                  {/*<Translate contentKey="entity.action.edit">Menu</Translate>*/}
                </span>
              </Button>
              {/*<Button tag={Link} to={`/entity/category/${curCategoryId}/edit`} color="primary" size="sm">*/}
              <Button tag={Link} to={`/entity/category`} color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <span className="d-xs-inline">
                  Categories
                  {/*<Translate contentKey="entity.action.edit">Category</Translate>*/}
                </span>
              </Button>
              <Button tag={Link} to={`/entity/dish`} color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <span className="d-xs-inline">
                  Dishes
                  {/*<Translate contentKey="entity.action.edit">Category</Translate>*/}
                </span>
              </Button>
            </div>
          )}
          <label className="search-label-dishes col-lg-12 col-md-12 col-sm-11 col-xs-12" htmlFor="search-input">
            <input
              type="text"
              name="query"
              value={querySearch}
              id="search-input"
              placeholder="Provide name of dish or ingredient"
              onChange={this.handleOnInputChange}
              className="col-lg-12 col-md-12"
            />
            <i className="fa fa-search search-icon" aria-hidden="true" />
          </label>
        </div>
        <div className="root row col-lg-12 col-md-12 col-sm-12 co-xs-12">
          <GridList cellHeight={180} className="gridList col-lg-12 col-md-12 col-sm-12">
            <GridListTile
              className="grid-list-title col-lg-12 col-md-12 col-sm-12 col-xs-12"
              key="Subheader"
              cols={2}
              style={{ height: 'auto' }}
            >
              <div className="grid-list-title-label col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ListSubheader component="div" style={{ fontSize: '25px', color: 'black' }}>
                  {querySearch !== '' ? 'Result of searching: ' + querySearch : categoryLabel === undefined ? 'All dishes' : curLabel}
                </ListSubheader>
              </div>
            </GridListTile>
            {results.map(dish => {
              return <DishComponent key={dish.id} dishEnt={dish} />;
            })}
          </GridList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dish, category, ingredient, menu, ingredientToDish, authentication }: IRootState) => ({
  dishList: dish.entities,
  totalItems: dish.totalItems,
  categoryList: category.entities,
  ingredientList: ingredient.entities,
  ingredientToDishList: ingredientToDish.entities,
  chosenIngredient: ingredient.entity,
  menuList: menu.entities,
  account: authentication.account
});

const mapDispatchToProps = {
  getCategoryEntities,
  getEntities: getDishEntities,
  getIngredientsEntities,
  getIngredientsToDishEntities,
  getIngredientById,
  getMenuEntities,
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishList);
