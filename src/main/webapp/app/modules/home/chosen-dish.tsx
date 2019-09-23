import './home.css';
import './restaurantstyle.css';
import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { getEntities, getEntity } from 'app/entities/dish/dish.reducer';
import { RouteComponentProps } from 'react-router';
import { IBaseProps } from 'app/modules/home/new.IState';
import { connect } from 'react-redux';
import { IDishState } from 'app/entities/dish/dish';
import { IPaginationBaseState } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import GridListTile from '@material-ui/core/GridListTile';

export interface IChosenDishProps extends StateProps, IBaseProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export type IChosenDishState = IPaginationBaseState;

export class ChosenDish extends React.Component<IChosenDishProps, IChosenDishState> {
  constructor(props) {
    super(props);
    this.props.getEntity(this.props.match.params.id);
    this.props.getEntities;
  }

  componentDidMount(): void {
    this.props.getEntities();
  }

  render() {
    const { id, name, description, image, price, imageContentType, categoryIdCategory, categoryId } = this.props.dishEntity;
    let url = null;
    {
      url = image ? `data:${imageContentType};base64,${image}` : url;
    }
    return (
      <div>
        <h1>I AM HERE</h1>
        <h1>{id}</h1>
        <img src={url} alt={name} />
      </div>
    );
  }
}

const mapStateToProps = ({ dish }: IRootState) => ({
  dishList: dish.entities,
  dishEntity: dish.entity
});

const mapDispatchToProps = {
  getEntities,
  getEntity
};

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenDish);
