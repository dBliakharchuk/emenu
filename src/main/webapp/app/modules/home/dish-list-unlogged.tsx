import './home.css';

import React, { Component } from 'react';
import { IDishProps, IDishState } from 'app/entities/dish/dish';
import { getEntities } from 'app/entities/dish/dish.reducer';
import { getCategoryEntities } from 'app/entities/category/category.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState, Translate } from 'react-jhipster';
import RestaurantComponent from 'app/modules/home/restaurants-list';
import DishComponent from 'app/modules/home/DishComponent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Alert, Button } from 'reactstrap';
import { IBaseProps } from 'app/modules/home/new.IState';

export interface IDishProps extends StateProps, IBaseProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDishState = IPaginationBaseState;

/*const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);*/

class DishListUnlogged extends React.Component<IDishProps, IDishState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCategoryEntities();
    this.props.getEntities();
  }

  render() {
    const { dishList, categoryList } = this.props;

    /* console.log("DishListUnlogged************");
        console.log({dishList});
        const url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
        const dishComponents = dishList.map((dish, i) => (
            <DishComponent key={ dish.id } dishEnt={ dish } />
        ));*/
    //const classes = useStyles();
    let url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    let curMenuId = this.props.menuPointerPosition;
    let curCategoryId = this.props.categoryPointerPosition;
    let curLabel = this.props.categoryLabel;
    console.log(curMenuId);
    console.log(curCategoryId);
    return (
      <div>
        <div className="root">
          <GridList cellHeight={180} className="gridList">
            <GridListTile key="Subheader" cols={2} style={{ height: '50px' }}>
              <ListSubheader component="div" style={{ fontSize: '25px' }}>
                {curLabel.label}
              </ListSubheader>
            </GridListTile>
            {dishList.map(
              dish =>
                curCategoryId === dish.categoryId ? (
                  <GridListTile key={dish.id} style={{ width: '30%', height: '240px' }}>
                    {(url = dish.image ? `data:${dish.imageContentType};base64,${dish.image}` : url)}
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
                        <IconButton className="icon">
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ) : (
                  console.log('boooomm')
                )
            )}
          </GridList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dish, category }: IRootState) => ({
  dishList: dish.entities,
  totalItems: dish.totalItems,
  categoryList: category.entities
});

const mapDispatchToProps = {
  getCategoryEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishListUnlogged);
