import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './menu.reducer';
import { IMenu } from 'app/shared/model/menu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MenuDetail extends React.Component<IMenuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { menuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.menu.detail.title">Menu</Translate> [<b>{menuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="emenuApp.menu.name">Name</Translate>
              </span>
            </dt>
            <dd>{menuEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="emenuApp.menu.description">Description</Translate>
              </span>
            </dt>
            <dd>{menuEntity.description}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="emenuApp.menu.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {menuEntity.image ? (
                <div>
                  <a onClick={openFile(menuEntity.imageContentType, menuEntity.image)}>
                    <img src={`data:${menuEntity.imageContentType};base64,${menuEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {menuEntity.imageContentType}, {byteSize(menuEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="imageContent">
                <Translate contentKey="emenuApp.menu.imageContent">Image Content</Translate>
              </span>
            </dt>
            <dd>{menuEntity.imageContent}</dd>
            <dt>
              <Translate contentKey="emenuApp.menu.restaurant">Restaurant</Translate>
            </dt>
            <dd>{menuEntity.restaurantIdRestaurant ? menuEntity.restaurantIdRestaurant : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/menu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/menu/${menuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ menu }: IRootState) => ({
  menuEntity: menu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDetail);
