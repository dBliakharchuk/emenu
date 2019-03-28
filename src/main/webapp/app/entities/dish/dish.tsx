import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dish.reducer';
import { IDish } from 'app/shared/model/dish.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDishProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Dish extends React.Component<IDishProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dishList, match } = this.props;
    return (
      <div>
        <h2 id="dish-heading">
          <Translate contentKey="emenuApp.dish.home.title">Dishes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="emenuApp.dish.home.createLabel">Create new Dish</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.idDish">Id Dish</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.dish.category">Category</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dishList.map((dish, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dish.id}`} color="link" size="sm">
                      {dish.id}
                    </Button>
                  </td>
                  <td>{dish.idDish}</td>
                  <td>{dish.name}</td>
                  <td>{dish.description}</td>
                  <td>{dish.price}</td>
                  <td>{dish.category ? <Link to={`category/${dish.category.id}`}>{dish.category.idCategory}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dish.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dish.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dish.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dish }: IRootState) => ({
  dishList: dish.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dish);
