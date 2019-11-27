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
import { faGlobeAmericas, faComments, faHome} from '@fortawesome/free-solid-svg-icons'
import { getSession } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import { getPhotoEntities, reset } from 'app/entities/photo/photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { IPhotoGallery } from 'app/shared/model/photo.gallery.model';
// tslint:disable-next-line:no-unused-variable
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
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
    const { photoList, match, totalItems, account } = this.props;
    const { id, image, description, imageContentType, name, googleMapsLink, tripAdvisorLink, webPageLink } = this.props.restaurantEnt;
    const url = image
      ? `data:${imageContentType};base64,${image}`
      : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0oXSyenhAhVNL1AKHV0XBcUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D34596%26picture%3Dquestion-mark&psig=AOvVaw0xg9g0Nu5CD1GypEHO8J-U&ust=1556224350196034';

    let isAdmin = false;
    let isUser = false;
    let isUnlogged = true;

    let photoSet = photoList.filter((photo) => id === photo.restaurantId).map( photo => (
            {
                src: `data:${photo.imageContentType};base64,${photo.image}`,
                width: 1,
                height: 1,
                key: `${photo.id}`,
                className: "col-lg-3 col-md-3 col-sm-6 col-xs-6"
            }
         ));


      if (account !== null && account !== undefined && account.authorities !== undefined ) {
          account.authorities.map((authority, i) => {
              if (authority === AUTHORITIES.ADMIN) {
                  isAdmin = true;
                  isUnlogged = false;
              } else if (authority === AUTHORITIES.USER) {
                  isUser = true;
                  isUnlogged = false;
              }
          });
      }
      let hideButton = {
          display: 'none'
      };
      let showButton = {
          display: 'inline-block'
      };

    return (
      <Row className="main-header-container">
        <div className="restaurant-header row col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="header-gallery-main-container row col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <img src={url} className="col-lg-12 col-md-12 col-sm-6 col-xs-6" alt="Loading..." />
              { photoSet.length > 0 && (
                  <Gallery margin={0} photos={photoSet ? photoSet : []} onClick={this.openLightbox} />
              )}
              { photoSet.length > 0 && (
                  <Lightbox
                      images={ photoSet }
                      onClose={this.closeLightbox}
                      onClickPrev={this.gotoPrevious}
                      onClickNext={this.gotoNext}
                      currentImage={this.state.currentImage}
                      isOpen={this.state.lightboxIsOpen}
                  />
              )}
          </div>
          <div className="header-main-content col-lg-7 col-md-8 col-sm-12 col-xs-12">
            <h1>{name}</h1>
            <h2>{description}</h2>
          </div>
          <div className="header-main-buttons col-lg-1 col-md-12 col-sm-12 col-xs-12">
              <a
                  className="header-link-button"
                  // href="https://www.google.com/maps/place/Monster+Cook/@51.096124,17.0656949,13z/data=!4m8!1m2!2m1!1sRestaurants!3m4!1s0x470fc2a770038665:0xe88ca9353e0123fa!8m2!3d51.1040181!4d17.0873052"
                  href={ googleMapsLink }
                  style={ googleMapsLink ? showButton : hideButton}
                  target="_blank"
              >
                  <FontAwesomeIcon icon={faGlobeAmericas} />{' '}
                  <span className="d-xs-none d-md-inline">
                                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                      GMaps
                            </span>
              </a>
              <a
                  className="header-link-button"
                  href={ tripAdvisorLink }
                  style={ tripAdvisorLink ? showButton : hideButton }
                  target="_blank"
              >
                  <FontAwesomeIcon icon={faComments} />{' '}
                  <span className="d-xs-none d-md-inline d-lg-inline">
                                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                      TripAdv
                            </span>
              </a>
              <a
                  className="header-link-button"
                  href={webPageLink}
                  style={webPageLink ? showButton : hideButton}
                  target="_blank"
              >
                  <FontAwesomeIcon icon={faHome} />{' '}
                  <span className="d-md-inline">
                                 {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                      WebPage
                            </span>
              </a>
            {
                (isAdmin || isUser) &&
                (<Button tag={Link} to={`/entity/restaurant/${id}/edit`} color="primary">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-xs-none d-sm-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                </Button>)
            }
            {
                (isAdmin || isUser) &&
                (<Button tag={Link} to={`/entity/restaurant/${id}/delete`} color="danger" >
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-xs-none d-sm-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
                </Button>)
            }
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ photo, authentication }: IRootState) => ({
  photoList: photo.entities,
  totalItems: photo.totalItems,
  account: authentication.account
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
