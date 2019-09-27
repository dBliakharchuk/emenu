import 'app/modules/home/css/home.css';
import 'app/modules/home/css/dish-style.css';

import React, { Component } from 'react';
import { getEntities } from 'app/entities/dish/dish.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { getPhotoEntities, reset } from 'app/entities/photo/photo.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import RestaurantComponent from 'app/modules/home/restaurants-main-page/restaurants-list';
import DishComponent from 'app/modules/home/choosen-restaurant-page/body/DishComponent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Alert, Button } from 'reactstrap';
import { IBaseProps } from 'app/modules/home/choosen-restaurant-page/body/new.IState';
import { NavLink as Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import Popup from 'reactjs-popup';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export interface IDishProps extends StateProps, IBaseProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDishState extends IPaginationBaseState {
  currentImage: number;
  lightboxIsOpen: boolean;
}

class DishList extends React.Component<IDishProps, IDishState> {
  state: IDishState = {
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
    this.props.getCategoryEntities();
    this.props.getEntities();
    this.props.getPhotoEntities();
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
    const { dishList, categoryList, photoList } = this.props;
    let url = null;
    let urlReplacementImg = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    let curMenuId = this.props.menuPointerPosition;
    let curCategoryId = this.props.categoryPointerPosition;
    let curLabel = this.props.categoryLabel;
    console.log(curLabel);
    console.log(curCategoryId);

    const photoSet = photoList.map((photo, index) => {
      // Calculate shape of photo
      // Create new entity with height and width
      return {
        src: `data:${photo.imageContentType};base64,${photo.image}`,
        width: 1,
        height: 1
      };
    });

    return (
      <div>
        <div className="root">
          <GridList cellHeight={180} className="gridList">
            <GridListTile className="grid-list-title" key="Subheader" cols={2} style={{ height: 'auto' }}>
              <div className="grid-list-title-label">
                <ListSubheader component="div" style={{ fontSize: '25px', color: 'black' }}>
                  {curLabel.label === undefined ? 'All' : curLabel.label}
                </ListSubheader>
              </div>
              <div className="body-edit-buttons">
                {/*<Button tag={Link} to={`/entity/menu/${curMenuId}/edit`} color="primary" size="sm">*/}
                <Button tag={Link} to={`/entity/menu`} color="primary" size="sm">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    Menus
                    {/*<Translate contentKey="entity.action.edit">Menu</Translate>*/}
                  </span>
                </Button>
                {/*<Button tag={Link} to={`/entity/category/${curCategoryId}/edit`} color="primary" size="sm">*/}
                <Button tag={Link} to={`/entity/category`} color="primary" size="sm">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    Categories
                    {/*<Translate contentKey="entity.action.edit">Category</Translate>*/}
                  </span>
                </Button>
                <Button tag={Link} to={`/entity/dish`} color="primary" size="sm">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    Dishes
                    {/*<Translate contentKey="entity.action.edit">Category</Translate>*/}
                  </span>
                </Button>
              </div>
            </GridListTile>
            {dishList.map(dish => {
              console.log('CurCategoryID: ' + curCategoryId);
              //Return all dishes from all categories
              if (curCategoryId === 0) {
                return (
                  <GridListTile key={dish.id} style={{ width: '25%', height: '200px' }} className="main-body-dish-list-img">
                    {(url = dish.image !== null ? `data:${dish.imageContentType};base64,${dish.image}` : urlReplacementImg)}
                    <img src={url} alt={dish.name} />
                    <GridListTileBar
                      title={dish.name}
                      subtitle={
                        <span>
                          price: {dish.price}
                          zł
                        </span>
                      }
                      actionIcon={
                        <div>
                          <Popup
                            trigger={
                              <IconButton className="icon">
                                <InfoIcon />
                              </IconButton>
                            }
                            modal
                          >
                            {close => (
                              <div className="modal">
                                <a className="close" onClick={close}>
                                  &times;
                                </a>
                                <div className="header"> {dish.name} </div>
                                <div className="content">
                                  {' '}
                                  <div className="dish-popup-gallery">
                                    <img src={`data:${dish.imageContentType};base64,${dish.image}`} alt={dish.name} />
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
                                  <div className="dish-popup-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut,
                                    minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit
                                    amet dignissimos?
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio
                                    voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas
                                    rem alias. Vitae?
                                  </div>
                                </div>
                                <div className="actions">
                                  <Popup trigger={<button className="button"> Trigger </button>} position="top center" closeOnDocumentClick>
                                    <span>
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime
                                      molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente!
                                      Laudantium, aperiam doloribus. Odit, aut.
                                    </span>
                                  </Popup>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      console.log('modal closed ');
                                      close();
                                    }}
                                  >
                                    close modal
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
              } else {
                /*(curCategoryId === dish.categoryId ? (*/
                if (curCategoryId === dish.categoryId) {
                  return (
                    <GridListTile key={dish.id} style={{ width: '25%', height: '200px' }} className="main-body-dish-list-img">
                      {(url = dish.image !== null ? `data:${dish.imageContentType};base64,${dish.image}` : urlReplacementImg)}
                      <img src={url} alt={dish.name} />
                      <GridListTileBar
                        title={dish.name}
                        subtitle={
                          <span>
                            price: {dish.price}
                            zł
                          </span>
                        }
                        actionIcon={
                          <div>
                            <Popup
                              trigger={
                                <IconButton className="icon">
                                  <InfoIcon />
                                </IconButton>
                              }
                              modal
                            >
                              {close => (
                                <div className="modal">
                                  <a className="close" onClick={close}>
                                    &times;
                                  </a>
                                  <div className="header"> {dish.name} </div>
                                  <div className="content">
                                    {' '}
                                    <div className="dish-popup-gallery">
                                      <img src={`data:${dish.imageContentType};base64,${dish.image}`} alt={dish.name} />
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
                                    <div className="dish-popup-description">
                                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem
                                      ut, minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci
                                      fugit amet dignissimos?
                                      <br />
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio
                                      voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
                                      voluptas rem alias. Vitae?
                                    </div>
                                  </div>
                                  <div className="actions">
                                    <Popup
                                      trigger={<button className="button"> Trigger </button>}
                                      position="top center"
                                      closeOnDocumentClick
                                    >
                                      <span>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime
                                        molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente!
                                        Laudantium, aperiam doloribus. Odit, aut.
                                      </span>
                                    </Popup>
                                    <button
                                      className="button"
                                      onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                      }}
                                    >
                                      close modal
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
                } else {
                  console.log('Unrecognized error');
                }
              }
            })}
          </GridList>
        </div>
      </div>
    );
  }
}

{
  /*<NavItem tag={Link} to={`/chosenDish/${dish.id}`}>
                          <IconButton className="icon">
                            <InfoIcon />
                          </IconButton>
    </NavItem>*/
}
const mapStateToProps = ({ dish, category, photo }: IRootState) => ({
  dishList: dish.entities,
  totalItems: dish.totalItems,
  categoryList: category.entities,
  photoList: photo.entities
});

const mapDispatchToProps = {
  getCategoryEntities,
  getEntities,
  getPhotoEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishList);
