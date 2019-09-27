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
import { getPhotoEntities, reset } from 'app/entities/photo/photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { IBasePropsRestaurant } from 'app/modules/home/choosen-restaurant-page/body/new.IState';

export interface IRestaurantHeaderProps extends IBasePropsRestaurant, StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRestaurantHeaderState extends IPaginationBaseState {
  currentImage: number;
  lightboxIsOpen: boolean;
}

export class RestaurantHeader extends React.Component<IRestaurantHeaderProps, IRestaurantHeaderState> {
  state: IRestaurantHeaderState = {
    activePage: 0,
    itemsPerPage: 0,
    order: '',
    sort: '',
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
    this.props.getEntities();
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

  render() {
    const { photoList, match, totalItems } = this.props;
    const { id, image, description, imageContentType, name } = this.props.restaurantEnt;
    const url = image
      ? `data:${imageContentType};base64,${image}`
      : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0oXSyenhAhVNL1AKHV0XBcUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D34596%26picture%3Dquestion-mark&psig=AOvVaw0xg9g0Nu5CD1GypEHO8J-U&ust=1556224350196034';

    const photoSet = photoList.map((photo, index) => {
      // Calculate shape of photo
      // Create new entity with height and width
      console.log('photo Restaurant ID ' + photo.restaurantId + ' ID: ' + this.props.restaurantEnt);
      console.log('INDEX ' + index);

      return {
        src: `data:${photo.imageContentType};base64,${photo.image}`,
        width: 1,
        height: 1
      };
    });
    photoSet.push({
      src: `data:${imageContentType};base64,${image}`,
      width: 3,
      height: 3.5
    });

    return (
      <Row className="main-header-container">
        <div className="restaurant-header">
          <div className="header-gallery-main-container">
            <img src={url} alt="Loading..." />
            <Gallery photos={photoSet} onClick={this.openLightbox} />
            <Lightbox
              images={photoSet}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </div>
          <div className="header-main-content">
            <h1>{name}</h1>
            <h2>{description}</h2>
          </div>

          <div className="header-main-buttons">
            <Button tag={Link} to={`/entity/restaurant/${id}/edit`} color="primary" size="sm">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            <a
              className="header-link-button"
              href="https://www.google.com/maps/d/u/0/viewer?hl=en&ie=UTF8&view=map&ctz=420&msa=0&ll=36.22584900000001%2C-119.32679100000001&spn=0.006439%2C0.007145&z=17&iwloc=0004a397dd9dfef804e64&mid=1GoRZ4B9Q4e1dsxz6cPzc1HemgQI"
              target="_blank"
            >
              <FontAwesomeIcon icon="pencil-alt" />
              <span className="d-none d-md-inline">
                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                GMaps
              </span>
            </a>
            <a
              className="header-link-button"
              href="https://www.google.com/maps/d/u/0/viewer?hl=en&ie=UTF8&view=map&ctz=420&msa=0&ll=36.22584900000001%2C-119.32679100000001&spn=0.006439%2C0.007145&z=17&iwloc=0004a397dd9dfef804e64&mid=1GoRZ4B9Q4e1dsxz6cPzc1HemgQI"
              target="_blank"
            >
              <FontAwesomeIcon icon="pencil-alt" />
              <span className="d-none d-md-inline">
                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                TripAdv
              </span>
            </a>
            <a
              className="header-link-button"
              href="https://www.google.com/maps/d/u/0/viewer?hl=en&ie=UTF8&view=map&ctz=420&msa=0&ll=36.22584900000001%2C-119.32679100000001&spn=0.006439%2C0.007145&z=17&iwloc=0004a397dd9dfef804e64&mid=1GoRZ4B9Q4e1dsxz6cPzc1HemgQI"
              target="_blank"
            >
              <FontAwesomeIcon icon="pencil-alt" />
              <span className="d-none d-md-inline">
                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                WebPage
              </span>
            </a>
            <Button tag={Link} to={`/entity/restaurant/${id}/delete`} color="danger" size="sm">
              <FontAwesomeIcon icon="trash" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </span>
            </Button>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ photo }: IRootState) => ({
  photoList: photo.entities,
  totalItems: photo.totalItems
});

const mapDispatchToProps = {
  getEntities: getPhotoEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantHeader);
