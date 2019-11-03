import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getIngredientsEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IDish } from 'app/shared/model/dish.model';
import { getDishEntities } from 'app/entities/dish/dish.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ingredient-to-dish.reducer';
import { IIngredientToDish } from 'app/shared/model/ingredient-to-dish.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIngredientToDishUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIngredientToDishUpdateState {
  isNew: boolean;
  toIngredientId: string;
  toDishId: string;
}

export class IngredientToDishUpdate extends React.Component<IIngredientToDishUpdateProps, IIngredientToDishUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      toIngredientId: '0',
      toDishId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getIngredients();
    this.props.getDishEntities();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ingredientToDishEntity } = this.props;
      const entity = {
        ...ingredientToDishEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/ingredient-to-dish');
  };

  render() {
    const { ingredientToDishEntity, ingredients, dishes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="emenuApp.ingredientToDish.home.createOrEditLabel">
              <Translate contentKey="emenuApp.ingredientToDish.home.createOrEditLabel">Create or edit a IngredientToDish</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ingredientToDishEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ingredient-to-dish-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="unitLabel" for="unit">
                    <Translate contentKey="emenuApp.ingredientToDish.unit">Unit</Translate>
                  </Label>
                  <AvField id="ingredient-to-dish-unit" type="text" name="unit" />
                </AvGroup>
                <AvGroup>
                  <Label id="weightLabel" for="weight">
                    <Translate contentKey="emenuApp.ingredientToDish.weight">Weight</Translate>
                  </Label>
                  <AvField id="ingredient-to-dish-weight" type="string" className="form-control" name="weight" />
                </AvGroup>
                <AvGroup>
                  <Label id="isMainLabel" check>
                    <AvInput id="ingredient-to-dish-isMain" type="checkbox" className="form-control" name="isMain" />
                    <Translate contentKey="emenuApp.ingredientToDish.isMain">Is Main</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="isHiddenLabel" check>
                    <AvInput id="ingredient-to-dish-isHidden" type="checkbox" className="form-control" name="isHidden" />
                    <Translate contentKey="emenuApp.ingredientToDish.isHidden">Is Hidden</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="toIngredient.id">
                    <Translate contentKey="emenuApp.ingredientToDish.toIngredient">To Ingredient</Translate>
                  </Label>
                  <AvInput id="ingredient-to-dish-toIngredient" type="select" className="form-control" name="toIngredientId">
                    <option value="" key="0" />
                    {ingredients
                      ? ingredients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="toDish.id">
                    <Translate contentKey="emenuApp.ingredientToDish.toDish">To Dish</Translate>
                  </Label>
                  <AvInput id="ingredient-to-dish-toDish" type="select" className="form-control" name="toDishId">
                    <option value="" key="0" />
                    {dishes
                      ? dishes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ingredient-to-dish" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ingredients: storeState.ingredient.entities,
  dishes: storeState.dish.entities,
  ingredientToDishEntity: storeState.ingredientToDish.entity,
  loading: storeState.ingredientToDish.loading,
  updating: storeState.ingredientToDish.updating,
  updateSuccess: storeState.ingredientToDish.updateSuccess
});

const mapDispatchToProps = {
  getIngredients,
  getDishEntities,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientToDishUpdate);
