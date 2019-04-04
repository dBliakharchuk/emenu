import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dish.reducer';
import { IDish } from 'app/shared/model/dish.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDishDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DishDetail extends React.Component<IDishDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dishEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.dish.detail.title">Dish</Translate> [<b>{dishEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="emenuApp.dish.name">Name</Translate>
              </span>
            </dt>
            <dd>{dishEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="emenuApp.dish.description">Description</Translate>
              </span>
            </dt>
            <dd>{dishEntity.description}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="emenuApp.dish.price">Price</Translate>
              </span>
            </dt>
            <dd>{dishEntity.price}</dd>
            <dt>
              <Translate contentKey="emenuApp.dish.category">Category</Translate>
            </dt>
            <dd>{dishEntity.categoryIdCategory ? dishEntity.categoryIdCategory : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/dish" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/dish/${dishEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dish }: IRootState) => ({
  dishEntity: dish.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
