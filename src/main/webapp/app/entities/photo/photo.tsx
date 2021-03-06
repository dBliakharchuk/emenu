import React from 'react';
import 'app/modules/home/css/home.css';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination,
  log
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getPhotoEntities, reset } from './photo.reducer';
import { getRestaurantEntities, getRestaurantEntity } from '../restaurant/restaurant.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { getDishEntities } from 'app/entities/dish/dish.reducer';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { getSession } from "app/shared/reducers/authentication";
import {IDish} from "app/shared/model/dish.model";
import dish from "app/entities/dish/dish";

export interface IPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPhotoState extends IPaginationBaseState {
  currentImage: number;
  lightboxIsOpen: boolean;
}

export class Photo extends React.Component<IPhotoProps, IPhotoState> {
  state: IPhotoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    currentImage: 0,
    lightboxIsOpen: false
  };

  constructor(props) {
    super(props);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    this.reset();
      this.props.getRestaurantEntities();
      this.props.getMenuEntities();
      this.props.getCategoryEntities();
      this.props.getDishEntities();
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.getEntities());
  };

  handleLoadMore = page => {
    this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.reset()
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

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

    findNameRestaurantById(restaurantID) {
        const { restaurantList } = this.props;
        const foundRestaurant = restaurantList.find(restaurant => (restaurant.id == restaurantID));
        return (foundRestaurant !== undefined && foundRestaurant !== null) && foundRestaurant.name
    }

    findNameDishById(DishID) {
        const { dishList } = this.props;
        const foundDish = dishList.find(restaurant => (restaurant.id == DishID));
        return (foundDish !== undefined && foundDish !== null) && foundDish.name
    }
  render() {
      const { dishList, photoList, match, restaurantList, menuList, categoryList, account } = this.props;
      let isAdmin = false;
      let isUser = false;
      let finalListOfPhotos : ReadonlyArray<IPhoto> = [];

      if (account != null) {
          account.authorities.map((authority, i) => {
              if (authority === AUTHORITIES.ADMIN) {
                  isAdmin = true;
              } else if (authority === AUTHORITIES.USER) {
                  isUser = true;
              }
          });
      }

      if (isAdmin) {
          finalListOfPhotos = photoList;
      } else if (isUser) {
          restaurantList.filter(restaurant => account.id === restaurant.userId).map( restaurant => {
              menuList.filter( menu => restaurant.id === menu.restaurantId).map( menu => {
                  categoryList.filter(( category => menu.id === category.menuId)).map( category => {
                      dishList.filter( dish => dish.categoryId === category.id).map(dish => {
                          finalListOfPhotos = finalListOfPhotos.concat(photoList.filter(photo =>
                              dish.id === photo.dishId || restaurant.id === photo.restaurantId));
                      });
                  })
              })
          })
      }

    const photoSet = photoList.map((photo, index) => {
      // Calculate shape of photo
      // Create new entity with height and width
      console.log('Index: ' + index);
      if (index === 0) {
        return {
          src: `data:${photo.imageContentType};base64,${photo.image}`,
          width: 3,
          height: 3.5
        };
      } else {
        return {
          src: `data:${photo.imageContentType};base64,${photo.image}`,
          width: 1,
          height: 1
        };
      }
    });



    return (
      <div>
        <h2 id="photo-heading">
          <Translate contentKey="emenuApp.photo.home.title">Photos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.photo.home.createLabel">Create new Photo</Translate>
          </Link>
        </h2>
        {/*<div className="gallery-main-container">
          <Gallery photos={photoSet} onClick={this.openLightbox} />
          <Lightbox
            images={photoSet}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        </div>*/}
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('title')}>
                  <Translate contentKey="emenuApp.photo.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  <Translate contentKey="emenuApp.photo.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('image')}>
                  <Translate contentKey="emenuApp.photo.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="emenuApp.photo.restaurant">Restaurant</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="emenuApp.photo.dish">Dish</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {finalListOfPhotos.map((photo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${photo.id}`} color="link" size="sm">
                      {photo.id}
                    </Button>
                  </td>
                  <td>{photo.title}</td>
                  <td>{photo.description}</td>
                  <td>
                    {photo.image ? (
                      <div>
                        <a onClick={openFile(photo.imageContentType, photo.image)}>
                          <img src={`data:${photo.imageContentType};base64,${photo.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {photo.imageContentType}, {byteSize(photo.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {photo.restaurantIdRestaurant ? (
                      <Link to={`restaurant/${photo.restaurantId}`}>
                        {
                          /*(this.props.getRestaurantEntity(photo.restaurantIdRestaurant) != null) &&
                          this.props.restaurantEntity.id*/
                          this.findNameRestaurantById(photo.restaurantIdRestaurant)
                        }
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{photo.dishIdDish ? <Link to={`dish/${photo.dishId}`}>{this.findNameDishById(photo.dishIdDish)}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${photo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photo.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          {/*<JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />*/}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ photo, restaurant, dish, menu, category, authentication }: IRootState) => ({
  photoList: photo.entities,
  restaurantList: restaurant.entities,
  dishList: dish.entities,
  menuList: menu.entities,
  categoryList: category.entities,
  account: authentication.account,
  restaurantEntity: restaurant.entity,
  totalItems: photo.totalItems

});

const mapDispatchToProps = {
  getEntities: getPhotoEntities,
  getDishEntities: getDishEntities,
  getRestaurantEntities: getRestaurantEntities,
  getRestaurantEntity: getRestaurantEntity,
  getMenuEntities,
  getCategoryEntities,
  getSession,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photo);
