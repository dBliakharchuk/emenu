import 'app/modules/home/css/dish-style.css';

import React, { Component } from 'react';
import { IDish } from 'app/shared/model/dish.model';
import { NavItem } from 'reactstrap';
import {NavLink as Link, RouteComponentProps} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popup from 'reactjs-popup';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {getPhotoEntities} from 'app/entities/photo/photo.reducer';
import {connect} from "react-redux";
import {IPaginationBaseState} from "react-jhipster";


export interface IDishComponentState {
    currentImage: number;
    lightboxIsOpen: boolean;
}

export interface IDishComponentPropsAddtional {
    dishEnt: IDish;
}

export interface IDishComponentPropsFull extends StateProps, IDishComponentPropsAddtional, DispatchProps, RouteComponentProps<{ url: string }> {}

class DishComponent extends React.Component<IDishComponentPropsFull, IDishComponentState> {
  state: IDishComponentState = {
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

  componentDidMount(): void {
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

  render() {
      const { id, name, description, price, imageContentType, image } = this.props.dishEnt;
      let url = null;
      let urlReplacementImg = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';

      let dishGallery = this.getPhotosByDishID(id);
      console.log(this.state.currentImage);
      return (
          <GridListTile key={id}
                        className="main-body-dish-list-img col-lg-3 col-md-4 col-sm-4 col-xs-6">
              {(url = image !== null ? `data:${imageContentType};base64,${image}` : urlReplacementImg)}
              <img src={url} alt={name}/>
              <GridListTileBar
                  title={name}
                  subtitle={
                      <span>
                          price: {price}
                          zł
                      </span>
                  }
                  actionIcon={
                      <div >
                          <Popup
                              className="popup-main-container"
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
                                      <div className="header col-12"> {name} </div>
                                      <div className="content col-12">
                                          {' '}
                                          <div className="dish-popup-gallery col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                              <img
                                                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                  src={`data:${imageContentType};base64,${image}`}
                                                  alt={name}/>
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
                                              <br/>
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipisicing elit. Consequatur sit commodi beatae
                                              optio
                                              voluptatum sed eius cumque, delectus saepe
                                              repudiandae explicabo nemo nam libero ad,
                                              doloribus,
                                              voluptas rem alias. Vitae?
                                          </div>
                                      </div>
                                      <div className="actions ol-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <Popup
                                              trigger={<button
                                              className="popup-button"> Ingredients </button>}
                                              position="top center"
                                              contentStyle={{width: "50%"}}
                                              closeOnDocumentClick
                                          >
                                              {/*<ul>
                                                    { ingredientToDishList && ingredientToDishList
                                                        .filter(ingredientToDish => (ingredientToDish.toDishId === dish.id))
                                                        .map(ingredientToDish => {
                                                            ingredientList.map(ingredient => {
                                                                return ingredientToDish.toIngredientId === ingredient.id &&
                                                                    (<li> {ingredient.name} </li>);                                                                                 return <li></li>
                                                            })
                                                        })
                                                    }
                                               </ul>*/}
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
  }
}

const mapStateToProps = ({ photo }) => ({
    photoList: photo.entities
});

const mapDispatchToProps = {
    getPhotoEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DishComponent);
