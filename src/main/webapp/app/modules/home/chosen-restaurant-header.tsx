import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { Row, Col, Alert, Button } from 'reactstrap';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';

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
          <div className="chosen-restaurant-buttons">
            <Button tag={Link} to={`/entity/restaurant/${id}/edit`} color="primary" size="sm">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            <Button tag={Link} to={`/entity/restaurant/${id}/delete`} color="danger" size="sm">
              <FontAwesomeIcon icon="trash" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </span>
            </Button>
            <a
              style={{ display: 'table-cell' }}
              href="https://www.google.com/maps/d/u/0/viewer?hl=en&ie=UTF8&view=map&ctz=420&msa=0&ll=36.22584900000001%2C-119.32679100000001&spn=0.006439%2C0.007145&z=17&iwloc=0004a397dd9dfef804e64&mid=1GoRZ4B9Q4e1dsxz6cPzc1HemgQI"
              target="_blank"
            >
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                {/*<Translate contentKey="entity.action.edit">GoogleMaps</Translate>*/}
                GoogleMaps
              </span>
            </a>
          </div>
        </div>
      </Row>
    );
  }
}

export default RestaurantHeader;
