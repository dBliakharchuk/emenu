import 'app/modules/home/css/restaurantstyle.css';

import React from 'react';
import { Row } from 'reactstrap';
import TreeMenu from 'react-simple-tree-menu';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getMenuEntities } from 'app/entities/menu/menu.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { RouteComponentProps } from 'react-router';
import DishListUnlogged from 'app/modules/home/choosen-restaurant-page/body/dish-list-unlogged';

export interface IMenuProps extends React.Component, StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMenuState {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
  chosenRestaurantId: number;
}

export class RestaurantBodyUnlogged extends React.Component<IMenuProps, IMenuState> {
  constructor(props) {
    super(props);
    this.state = {
      menuPointerPosition: 0,
      categoryPointerPosition: 0,
      categoryLabel: '',
      chosenRestaurantId: 0
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
          categoryLabel: curLabel.label
        });
        break;
      case 1:
        this.setState({
          categoryPointerPosition: curPos.index,
          menuPointerPosition: 0,
          categoryLabel: curLabel.label
        });
        break;
      default:
        this.setState({
          menuPointerPosition: 0,
          categoryPointerPosition: 0,
          categoryLabel: curLabel.label
        });
    }
  };

  onClickFunction = ({ key, level, label, ...props }) => {
    this.updateStatePositions({ ...props }, { label }, { level });
  };

  render() {
    // @ts-ignore
    let restaurantID = this.props.restaurantID;
    const { menuPointerPosition, categoryPointerPosition, categoryLabel } = this.state;
    const menusFromRestaurant = this.getAllMenusByRestaurantID(restaurantID);

    return (
      <Row>
        <div className="restaurant-body col-lg-4 col-md-4 col-sm-11 col-xs-11">
          <label>Menu</label>
          <TreeMenu key={restaurantID} data={menusFromRestaurant} onClickItem={this.onClickFunction} debounceTime={125} />
        </div>
        <div className="restaurant-dishes col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <DishListUnlogged
            menuPointerPosition={menuPointerPosition}
            categoryPointerPosition={categoryPointerPosition}
            categoryLabel={categoryLabel}
            chosenRestaurantId={restaurantID}
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
  getEntities: getMenuEntities,
  getCategoryEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantBodyUnlogged);
