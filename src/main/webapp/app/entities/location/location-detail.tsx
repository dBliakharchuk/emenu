import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getLocationEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LocationDetail extends React.Component<ILocationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { locationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="emenuApp.location.detail.title">Location</Translate> [<b>{locationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="addressGM">
                <Translate contentKey="emenuApp.location.addressGM">Address GM</Translate>
              </span>
            </dt>
            <dd>{locationEntity.addressGM}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="emenuApp.location.country">Country</Translate>
              </span>
            </dt>
            <dd>{locationEntity.country}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="emenuApp.location.city">City</Translate>
              </span>
            </dt>
            <dd>{locationEntity.city}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="emenuApp.location.street">Street</Translate>
              </span>
            </dt>
            <dd>{locationEntity.street}</dd>
            <dt>
              <span id="bilding">
                <Translate contentKey="emenuApp.location.bilding">Bilding</Translate>
              </span>
            </dt>
            <dd>{locationEntity.bilding}</dd>
            <dt>
              <span id="postcode">
                <Translate contentKey="emenuApp.location.postcode">Postcode</Translate>
              </span>
            </dt>
            <dd>{locationEntity.postcode}</dd>
          </dl>
          <Button tag={Link} to="/entity/location" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/location/${locationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity
});

const mapDispatchToProps = { getEntity: getLocationEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetail);
