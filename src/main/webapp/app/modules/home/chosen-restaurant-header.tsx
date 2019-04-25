import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { IRestaurant } from 'app/shared/model/restaurant.model';

class RestaurantHeader extends Component<{ restaurantEnt: IRestaurant }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, image, description, imageContentType, name } = this.props.restaurantEnt;
    const url = image
      ? `data:${imageContentType};base64,${image}`
      : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0oXSyenhAhVNL1AKHV0XBcUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D34596%26picture%3Dquestion-mark&psig=AOvVaw0xg9g0Nu5CD1GypEHO8J-U&ust=1556224350196034';

    return (
      <Row>
        <div className="restaurant-header">
          <img src={url} alt="Loading..." />
          <h2>{name}</h2>
          <h4>{description}</h4>
        </div>
      </Row>
    );
  }
}

export default RestaurantHeader;
