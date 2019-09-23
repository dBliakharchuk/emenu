import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { IDish } from 'app/shared/model/dish.model';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import dish from 'app/entities/dish/dish';

class DishComponent extends Component<{ dishEnt: IDish }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, price, categoryIdCategory, categoryId } = this.props.dishEnt;

    return (
      <NavItem tag={Link} to={`/chosenDish/${id}`}>
        <div>
          <h1>{id}</h1>
          <h1>{name}</h1>
          <h1>{description}</h1>
          <h1>{price}</h1>
        </div>
      </NavItem>
    );
  }
}

export default DishComponent;
