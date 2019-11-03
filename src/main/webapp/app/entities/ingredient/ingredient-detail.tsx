import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getIngredientById } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIngredientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IngredientDetail extends React.Component<IIngredientDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ingredientEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.ingredient.detail.title">Ingredient</Translate> [<b>{ingredientEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="emenuApp.ingredient.name">Name</Translate>
              </span>
            </dt>
            <dd>{ingredientEntity.name}</dd>
            <dt>
              <span id="isAllergic">
                <Translate contentKey="emenuApp.ingredient.isAllergic">Is Allergic</Translate>
              </span>
            </dt>
            <dd>{ingredientEntity.isAllergic ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/ingredient" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ingredient/${ingredientEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ ingredient }: IRootState) => ({
  ingredientEntity: ingredient.entity
});

const mapDispatchToProps = { getEntity: getIngredientById };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientDetail);
