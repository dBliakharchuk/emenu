import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import TreeMenu from 'react-simple-tree-menu';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState } from 'react-jhipster';
import { Menu } from 'app/entities/menu/menu';
import pop from 'atomic-layout/lib/types/utils/functions/pop';
import { number } from 'prop-types';
import { TreeNode } from 'react-simple-tree-menu/dist/TreeMenu/walk';
import { Simulate } from 'react-dom/test-utils';
import category from 'app/entities/category/category';
import DishList from 'app/modules/home/dish-list';
/*import { getCategoryEntities } from 'app/entities/category/category.reducer';*/

export interface IMenuProps extends React.Component, StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMenuState = IPaginationBaseState;

/*export class RestaurantBody extends Component<{ restaurantEnt: IRestaurant }, {}> {*/
export class RestaurantBody extends React.Component<IMenuProps, IMenuState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
    this.props.getCategoryEntities();
  }

  getAllCategoriesByMenuID(menuID) {
    return this.props.categoryList.length === 0
      ? []
      : this.props.categoryList.filter(category => menuID === category.menuId).map(selectedCategory => {
          return {
            key: selectedCategory.name,
            label: selectedCategory.name,
            index: selectedCategory.id,
            nodes: []
          };
        });
  }

  getAllMenusByRestaurantID(restaurantID) {
    return this.props.menuList.length === 0
      ? []
      : this.props.menuList.filter(menu => restaurantID === menu.restaurantId).map(selectedMenu => {
          return {
            key: selectedMenu.name + selectedMenu.id,
            label: selectedMenu.name,
            index: selectedMenu.id,
            nodes: this.getAllCategoriesByMenuID(selectedMenu.id)
          };
        });
  }

  render() {
    let restaurantID = this.props.restaurantID;
    const { menuList, categoryList } = this.props;
    // console.log('*********************');
    // console.log(categoryList);
    const menusFromRestaurant = this.getAllMenusByRestaurantID(restaurantID);
    // console.log('MENUS FROM Restaurant:');
    // console.log(menusFromRestaurant);

    return (
      <Row>
        <div className="restaurant-body">
          <TreeMenu key={restaurantID} data={menusFromRestaurant} />
        </div>
        <div className="restaurant-dishes">
          <DishList />
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ menu, category }: IRootState) => ({
  categoryList: category.entities,
  menuList: menu.entities
});

const mapDispatchToProps = {
  getEntities,
  getCategoryEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantBody);
