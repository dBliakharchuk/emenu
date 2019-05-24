import React, { Component } from 'react';
import { IDishProps, IDishState } from 'app/entities/dish/dish';
import { getEntities } from 'app/entities/dish/dish.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IPaginationBaseState } from 'react-jhipster';
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

export interface IDishProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

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

class DishList extends React.Component<IDishProps, IDishState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dishList } = this.props;

    /* console.log("DishList************");
        console.log({dishList});
        const url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
        const dishComponents = dishList.map((dish, i) => (
            <DishComponent key={ dish.id } dishEnt={ dish } />
        ));*/
    //const classes = useStyles();
    let url = 'https://www.zumoqr.com/assets/uploads/modeller/URL_Random_US.jpg';
    return (
      <div className="root">
        <GridList cellHeight={180} className="gridList">
          <GridListTile key="Subheader" cols={2} style={{ height: '50px' }}>
            <ListSubheader component="div">Menu1</ListSubheader>
          </GridListTile>
          {dishList.map(dish => (
            <GridListTile key={dish.id}>
              {(url = dish.image ? `data:${dish.imageContentType};base64,${dish.image}` : url)}
              <img src={url} alt={dish.name} />
              <GridListTileBar
                title={dish.name}
                subtitle={<span>by: {dish.description}</span>}
                actionIcon={
                  <IconButton className="icon">
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = ({ dish }: IRootState) => ({
  dishList: dish.entities,
  totalItems: dish.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishList);
