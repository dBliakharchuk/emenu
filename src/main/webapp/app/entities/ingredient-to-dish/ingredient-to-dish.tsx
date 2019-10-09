import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './ingredient-to-dish.reducer';
import { IIngredientToDish } from 'app/shared/model/ingredient-to-dish.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IIngredientToDishProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IIngredientToDishState = IPaginationBaseState;

export class IngredientToDish extends React.Component<IIngredientToDishProps, IIngredientToDishState> {
  state: IIngredientToDishState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { ingredientToDishList, match } = this.props;
    return (
      <div>
        <h2 id="ingredient-to-dish-heading">
          <Translate contentKey="emenuApp.ingredientToDish.home.title">Ingredient To Dishes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.ingredientToDish.home.createLabel">Create new Ingredient To Dish</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unit')}>
                    <Translate contentKey="emenuApp.ingredientToDish.unit">Unit</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('weight')}>
                    <Translate contentKey="emenuApp.ingredientToDish.weight">Weight</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isMain')}>
                    <Translate contentKey="emenuApp.ingredientToDish.isMain">Is Main</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isHidden')}>
                    <Translate contentKey="emenuApp.ingredientToDish.isHidden">Is Hidden</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="emenuApp.ingredientToDish.toIngredient">To Ingredient</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="emenuApp.ingredientToDish.toDish">To Dish</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ingredientToDishList.map((ingredientToDish, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ingredientToDish.id}`} color="link" size="sm">
                        {ingredientToDish.id}
                      </Button>
                    </td>
                    <td>{ingredientToDish.unit}</td>
                    <td>{ingredientToDish.weight}</td>
                    <td>{ingredientToDish.isMain ? 'true' : 'false'}</td>
                    <td>{ingredientToDish.isHidden ? 'true' : 'false'}</td>
                    <td>
                      {ingredientToDish.toIngredientId ? (
                        <Link to={`ingredient/${ingredientToDish.toIngredientId}`}>{ingredientToDish.toIngredientId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {ingredientToDish.toDishId ? <Link to={`dish/${ingredientToDish.toDishId}`}>{ingredientToDish.toDishId}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ingredientToDish.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ingredientToDish.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ingredientToDish.id}/delete`} color="danger" size="sm">
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
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ingredientToDish }: IRootState) => ({
  ingredientToDishList: ingredientToDish.entities,
  totalItems: ingredientToDish.totalItems,
  links: ingredientToDish.links,
  entity: ingredientToDish.entity,
  updateSuccess: ingredientToDish.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientToDish);
