import 'app/modules/home/css/home.css';
import 'app/modules/home/css/dish-style.css';

import React from 'react';
import {getDishEntities} from 'app/entities/dish/dish.reducer';
import {getCategoryEntities} from 'app/entities/category/category.reducer';
import {getMenuEntities} from 'app/entities/menu/menu.reducer';
import {getPhotoEntities} from 'app/entities/photo/photo.reducer';
import {getIngredientById, getIngredientsEntities} from 'app/entities/ingredient/ingredient.reducer';
import {getIngredientsToDishEntities} from 'app/entities/ingredient-to-dish/ingredient-to-dish.reducer';
import {IRootState} from 'app/shared/reducers';
import {RouteComponentProps} from 'react-router';
import {IPaginationBaseState} from 'react-jhipster';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from 'reactstrap';
import {IBaseProps} from 'app/modules/home/choosen-restaurant-page/body/new.IState';
import {NavLink as Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import {connect} from "react-redux";
import {IDish} from "app/shared/model/dish.model";
import {AUTHORITIES} from "app/config/constants";

export interface IDishProps extends StateProps, IBaseProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDishState extends IPaginationBaseState {
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
    return function (x) {
        return iTdList.filter(iTdElement => x.id == iTdElement.toDishId).filter(function (iTdElement) {
            return ingredientsList.filter(ingredient => (ingredient.id == iTdElement.toIngredientId)).length > 0
        }).length > 0;
    };
}

function searchingFor(querySearch) {
    return function(x) {
        if (x != null) {
            return (
                x.name.toLowerCase().includes(querySearch.toLowerCase()) ||
                !querySearch
            );
        } else {
            return false;
        }
    };
}

function searchingForIngredientsITD(dishId) {
    return function (ingredientToDish) {
        if (dishId !== null ) {
            return ingredientToDish.toDishId === dishId
        } else {
            return false;
        }
    }
}

class DishListUnlogged extends React.Component<IDishProps, IDishState> {
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
        this.props.getPhotoEntities();
        this.props.getIngredientsToDishEntities();
        this.props.getIngredientsEntities();
        this.props.getMenuEntities();

        this.renderDishListByPointerPosition();
        this.findDishesByChosenRestaurant();
    }

    componentDidUpdate(prevProps) {
        const {menuPointerPosition, categoryPointerPosition, chosenRestaurantId} = this.props;
        if (prevProps.chosenRestaurantId !== chosenRestaurantId ||
            prevProps.menuPointerPosition !== menuPointerPosition ||
            prevProps.categoryPointerPosition !== categoryPointerPosition) {
            this.renderDishListByPointerPosition();
        }
        if (prevProps.chosenRestaurantId !== chosenRestaurantId) {
            this.findDishesByChosenRestaurant()
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

    getPhotosByDishID(dishId) {
        return this.props.photoList.filter(photo => photo.dishId === dishId).map(photo => {
            return {
                src: `data:${photo.imageContentType};base64,${photo.image}`,
                width: 1,
                height: 1,
                key: `${photo.id}`,
                margin: 0
            };
        });
    }

    findDishesByChosenRestaurant() {
        const {dishList, categoryList, menuList, chosenRestaurantId} = this.props;
        let dishesByRestaurant: Array<IDish> = [];
        menuList.filter(menu => menu.restaurantId === chosenRestaurantId).map(menu => {
            categoryList.filter(category => category.menuId === menu.id).map(category => {
                dishesByRestaurant = dishesByRestaurant.concat(dishList.filter(dish => category.id === dish.categoryId));
            })
        });
        this.setState({
            dishesByRestaurant: dishesByRestaurant
        });
        return dishesByRestaurant;
    }

    renderDishListByPointerPosition() {
        const {menuPointerPosition, categoryPointerPosition, dishList, categoryList, menuList, chosenRestaurantId} = this.props;
        let chosenDishesByPointer = [];
        console.log("menuPos: " + menuPointerPosition, " categoryPos: " + categoryList)
        if (categoryPointerPosition === 0 && menuPointerPosition === 0) {
            chosenDishesByPointer = this.findDishesByChosenRestaurant();
        } else if (categoryPointerPosition === 0 && menuPointerPosition !== 0) {
            categoryList.filter(category => category.menuId === menuPointerPosition).map(category => {
                chosenDishesByPointer = chosenDishesByPointer.concat(dishList.filter(dish => category.id === dish.categoryId));
            });
        } else if (categoryPointerPosition !== 0) {
            chosenDishesByPointer = dishList.filter(dish => {
                return (categoryPointerPosition === dish.categoryId)
            })
        } else {
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
        const {dishesByRestaurant} = this.state;

        if (!query) {
            this.setState({querySearch: query, message: ''}, () => {
                this.renderDishListByPointerPosition();
            });
        } else {
            this.setState({querySearch: query, loading: true, message: ''}, () => {
                let chosenIngredientsList = this.props.ingredientList.filter(searchingFor(query));
                let chosenDishesByIng = dishesByRestaurant.filter(searchingForDishesByIng(chosenIngredientsList, this.props.ingredientToDishList));
                let chosenDishes = dishesByRestaurant.filter(searchingFor(query));
                this.fetchSearchResults(1, query, chosenDishes, chosenDishesByIng);
            });
        }
    };


    render() {
        const { categoryLabel } = this.props;
        const {querySearch, results} = this.state;
        let url = null;
        let urlReplacementImg = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
        let curLabel = this.props.categoryLabel;


            return (
                <div className="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="search-container-dishes col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                            <GridListTile className="grid-list-title col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                          key="Subheader" cols={2} style={{height: 'auto'}}>
                                <div className="grid-list-title-label col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <ListSubheader component="div" style={{fontSize: '25px', color: 'black'}}>
                                        {querySearch !== '' ? 'Result of searching: ' + querySearch :
                                            (categoryLabel.label === undefined) ? 'All dishes' : curLabel.label}
                                    </ListSubheader>
                                </div>
                            </GridListTile>
                            {results.map(dish => {
                                const dishGallery = this.getPhotosByDishID(dish.id);
                                return (
                                    <GridListTile key={dish.id}
                                                  className="main-body-dish-list-img col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                        {(url = dish.image !== null ? `data:${dish.imageContentType};base64,${dish.image}` : urlReplacementImg)}
                                        <img src={url} alt={dish.name}/>
                                        <GridListTileBar
                                            title={dish.name}
                                            subtitle={
                                                <span>
                                                    price: {dish.price}
                                                    zł
                                                </span>
                                            }
                                            actionIcon={
                                                <div className="popup-main-container" style={{ width:"100%" }}>
                                                    <Popup
                                                        trigger={
                                                            <IconButton className="icon">
                                                                <InfoIcon/>
                                                            </IconButton>
                                                        }
                                                        contentStyle={{width: "100%", margin: "15% 20px auto 20px"}}
                                                        position={"center center"}
                                                        modal
                                                    >
                                                        {close => (
                                                            <div className="modal row">
                                                                {/*<a className="close" onClick={() => {
                                                                    close();
                                                                }}
                                                                >
                                                                    &times;
                                                                </a>*/}
                                                                <div className="header col-lg-12 col-md-12 col-sm-12"> {dish.name} </div>
                                                                <div className="content col-lg-12 col-md-12 col-sm-12">
                                                                    {' '}
                                                                    <div className="dish-popup-gallery col-lg-4 col-md-4 col-sm-12">
                                                                        <img
                                                                            className="col-lg-12 col-md-12 col-sm-12"
                                                                            src={`data:${dish.imageContentType};base64,${dish.image}`}
                                                                            alt={dish.name}/>
                                                                        {dishGallery.length > 0 && (
                                                                            <Gallery
                                                                                     margin={0}
                                                                                     photos={dishGallery ? dishGallery : []}
                                                                                     onClick={this.openLightbox}
                                                                            />
                                                                        )}
                                                                        {dishGallery.length > 0 && (
                                                                            <Lightbox
                                                                                images={dishGallery}
                                                                                onClose={this.closeLightbox}
                                                                                onClickPrev={this.gotoPrevious}
                                                                                onClickNext={this.gotoNext}
                                                                                currentImage={this.state.currentImage}
                                                                                isOpen={this.state.lightboxIsOpen}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="dish-popup-description col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                                        Lorem ipsum dolor sit amet consectetur
                                                                        adipisicing elit. Atque, a nostrum. Dolorem,
                                                                        repellat quidem
                                                                        ut, minima sint vel eveniet quibusdam voluptates
                                                                        delectus doloremque, explicabo tempore dicta
                                                                        adipisci
                                                                        fugit amet dignissimos?
                                                                    </div>
                                                                </div>
                                                                <div className="actions col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <Popup
                                                                        trigger=
                                                                            {<button className="popup-button"> Ingredients </button>}
                                                                        closeOnDocumentClick
                                                                        position={"top center"}
                                                                        contentStyle={{width: "50%"}}
                                                                    >
                                                                        <ul>
                                                                            <li>Ingredient1</li>
                                                                            <li>Ingredient2</li>
                                                                        </ul>
                                                                    </Popup>
                                                                    <button
                                                                        className="popup-button"
                                                                        onClick={() => {
                                                                            console.log('modal closed ');
                                                                            close();
                                                                        }}
                                                                    >
                                                                        close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                </div>
                                            }
                                        />
                                    </GridListTile>
                                );
                            })}
                        </GridList>
                    </div>
                </div>
            );
        }
    }


const mapStateToProps = ({ dish, category, photo, ingredient, menu, ingredientToDish, authentication }: IRootState) => ({
    dishList: dish.entities,
    totalItems: dish.totalItems,
    categoryList: category.entities,
    photoList: photo.entities,
    ingredientList: ingredient.entities,
    ingredientToDishList: ingredientToDish.entities,
    chosenIngredient: ingredient.entity,
    menuList: menu.entities,
});

const mapDispatchToProps = {
    getCategoryEntities,
    getEntities: getDishEntities,
    getPhotoEntities,
    getIngredientsEntities,
    getIngredientsToDishEntities,
    getIngredientById,
    getMenuEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DishListUnlogged);
