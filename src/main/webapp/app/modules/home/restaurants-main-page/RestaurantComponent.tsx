import React from 'react';
import {IRestaurant} from 'app/shared/model/restaurant.model';
import {NavItem} from 'reactstrap';
import {NavLink as Link, RouteComponentProps} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {getLocationEntities, getLocationEntity} from 'app/entities/location/location.reducer';
import {IPaginationBaseState} from "react-jhipster";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";

export interface IRestaurantComponentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
    restaurantEnt: IRestaurant
}

export type IRestaurantComponentState = IPaginationBaseState;

class RestaurantComponent extends React.Component<IRestaurantComponentProps, IRestaurantComponentState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.getLocationEntities();
  }

  getLocationById() {
      const { locationList, restaurantEnt } = this.props;
      return (locationList.find(location => location.id === restaurantEnt.idLocationId));
  }

    render() {
    const { id, image, imageContentType, name } = this.props.restaurantEnt;
    const url = image
      ? `data:${imageContentType};base64,${image}`
      : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0oXSyenhAhVNL1AKHV0XBcUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D34596%26picture%3Dquestion-mark&psig=AOvVaw0xg9g0Nu5CD1GypEHO8J-U&ust=1556224350196034';

    const addressOfRestaurant = (this.getLocationById() !== undefined) ? this.getLocationById().city : 'undefined';
    return (
      <NavItem className="row col-xs-12 col-sm-6 col-md-4 col-lg-3" tag={Link} to={`/chosenRestaurant/${id}`}>
          <Card className="container-card-restaurant">
              <CardActionArea>
                  <CardMedia
                      component="img"
                      className="container-card-restaurant-media"
                      alt={name}
                      height = "190"
                      image={url}
                      title={name}
                      top="0"
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h6" component="h6">
                          {name}
                      </Typography>
                      <Typography color="textSecondary" className="container-card-restaurant-address">
                           Address: { addressOfRestaurant }
                      </Typography>
                  </CardContent>
              </CardActionArea>
          </Card>
      </NavItem>
    );
  }
}

const mapStateToProps = ({ location }: IRootState) => ({
    locationById: location.entity,
    locationList: location.entities
});

const mapDispatchToProps = {
    getLocationEntity,
    getLocationEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantComponent);
