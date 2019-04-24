import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IPhoto } from 'app/shared/model/photo.model';

class RestaurantComponent extends Component<{ restaurantEnt: IRestaurant }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, imageContentType, name } = this.props.restaurantEnt;
    const url = image ? `data:${imageContentType};base64,${image}` : 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';

    return (
      <div className="restaurantClass">
        <img src={url} alt="Loading..." />
        <h2>{name}</h2>
      </div>
    );
  }
}

export default RestaurantComponent;
