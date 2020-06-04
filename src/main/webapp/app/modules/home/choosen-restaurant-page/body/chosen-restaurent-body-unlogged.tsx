import 'app/modules/home/css/home.css';
import 'app/modules/home/css/restaurantstyle.css';
import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import TreeMenu from 'react-simple-tree-menu';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState } from 'react-jhipster';
import { IBaseState, IBaseProps } from 'app/modules/home/choosen-restaurant-page/body/new.IState';
import menu, { Menu } from 'app/entities/menu/menu';
import pop from 'atomic-layout/lib/types/utils/functions/pop';
import { number } from 'prop-types';
import { TreeNode } from 'react-simple-tree-menu/dist/TreeMenu/walk';
import { Simulate } from 'react-dom/test-utils';
import category from 'app/entities/category/category';
import DishListUnlogged from 'app/modules/home/choosen-restaurant-page/body/dish-list-unlogged';
import { POSITION_MENU, POSITION_CATEGORY } from './new.actions';
import { Input } from '@material-ui/core';
import myApp from './new.reducer';
import stringify = Mocha.utils.stringify;
import { Json } from 'enzyme-to-json';
import { logging } from 'selenium-webdriver';
import getLevel = logging.getLevel;
import DishList from 'app/modules/home/choosen-restaurant-page/body/chosen-restaurent-body';
/*import { getCategoryEntities } from 'app/entities/category/category.reducer';*/

export interface IMenuProps extends React.Component, StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMenuState = IBaseState;

let store = createStore(myApp);
/*export class RestaurantBody extends Component<{ restaurantEnt: IRestaurant }, {}> {*/
export class RestaurantBodyUnlogged extends React.Component<IMenuProps, IMenuState> {
  constructor(props) {
    super(props);
    this.state = {
      menuPointerPosition: 0,
      categoryPointerPosition: 0,
      categoryLabel: ''
    };
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

  updateStatePositions = (curPos, curLabel, curLevel) => {
    switch (curLevel.level) {
      case 0:
        this.setState({
          menuPointerPosition: curPos.index,
          categoryPointerPosition: 0,
          categoryLabel: curLabel
        });
        console.log('State level 0: changed');
        break;
      case 1:
        this.setState({
          categoryPointerPosition: curPos.index,
          menuPointerPosition: 0,
          categoryLabel: curLabel
        });
        console.log('State level 1: changed');
        break;
      default:
        this.setState({
          menuPointerPosition: 0,
          categoryPointerPosition: 0,
          categoryLabel: curLabel
        });
    }
  };

  render() {
    // @ts-ignore
    let restaurantID = this.props.restaurantID;
    const { menuPointerPosition, categoryPointerPosition } = this.state;
    // console.log('*********************');
    // console.log(categoryList);
    const menusFromRestaurant = this.getAllMenusByRestaurantID(restaurantID);
    // console.log('MENUS FROM Restaurant:');
    // console.log(menusFromRestaurant);

    return (
      <Row>
        <div className="restaurant-body">
          <TreeMenu
            key={restaurantID}
            data={menusFromRestaurant}
            activeCat={this.state}
            onClickItem={({ key, level, label, ...props }) => {
              // alert("Booom" + "Key:" + {key} + " Label: " + {label} + " ...props " + {...props});
              this.updateStatePositions({ ...props }, { label }, { level });
            }}
            debounceTime={125}
          />
        </div>
        <div className="restaurant-dishes">
          <DishListUnlogged
            menuPointerPosition={this.state.menuPointerPosition}
            categoryPointerPosition={this.state.categoryPointerPosition}
            categoryLabel={this.state.categoryLabel}
          />
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ menu, category, newReducer }: IRootState) => ({
  categoryList: category.entities,
  menuList: menu.entities,
  curPositionOfMenu: newReducer.curMenuPosition,
  curPositionOfCategory: newReducer.curCategoryPosition
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
)(RestaurantBodyUnlogged);
