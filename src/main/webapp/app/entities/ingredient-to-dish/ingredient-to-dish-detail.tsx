import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ingredient-to-dish.reducer';
import { IIngredientToDish } from 'app/shared/model/ingredient-to-dish.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIngredientToDishDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IngredientToDishDetail extends React.Component<IIngredientToDishDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ingredientToDishEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.ingredientToDish.detail.title">IngredientToDish</Translate> [<b>{ingredientToDishEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="unit">
                <Translate contentKey="emenuApp.ingredientToDish.unit">Unit</Translate>
              </span>
            </dt>
            <dd>{ingredientToDishEntity.unit}</dd>
            <dt>
              <span id="weight">
                <Translate contentKey="emenuApp.ingredientToDish.weight">Weight</Translate>
              </span>
            </dt>
            <dd>{ingredientToDishEntity.weight}</dd>
            <dt>
              <span id="isMain">
                <Translate contentKey="emenuApp.ingredientToDish.isMain">Is Main</Translate>
              </span>
            </dt>
            <dd>{ingredientToDishEntity.isMain ? 'true' : 'false'}</dd>
            <dt>
              <span id="isHidden">
                <Translate contentKey="emenuApp.ingredientToDish.isHidden">Is Hidden</Translate>
              </span>
            </dt>
            <dd>{ingredientToDishEntity.isHidden ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="emenuApp.ingredientToDish.toIngredient">To Ingredient</Translate>
            </dt>
            <dd>{ingredientToDishEntity.toIngredientId ? ingredientToDishEntity.toIngredientId : ''}</dd>
            <dt>
              <Translate contentKey="emenuApp.ingredientToDish.toDish">To Dish</Translate>
            </dt>
            <dd>{ingredientToDishEntity.toDishId ? ingredientToDishEntity.toDishId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ingredient-to-dish" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ingredient-to-dish/${ingredientToDishEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ ingredientToDish }: IRootState) => ({
  ingredientToDishEntity: ingredientToDish.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientToDishDetail);
