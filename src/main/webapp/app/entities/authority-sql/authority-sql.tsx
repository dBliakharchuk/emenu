import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './authority-sql.reducer';
import { IAuthoritySql } from 'app/shared/model/authority-sql.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAuthoritySqlProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AuthoritySql extends React.Component<IAuthoritySqlProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { authoritySqlList, match } = this.props;
    return (
      <div>
        <h2 id="authority-sql-heading">
          <Translate contentKey="emenuApp.authoritySql.home.title">Authority Sqls</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.authoritySql.home.createLabel">Create new Authority Sql</Translate>
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
                  <Translate contentKey="emenuApp.authoritySql.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.authoritySql.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {authoritySqlList.map((authoritySql, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${authoritySql.id}`} color="link" size="sm">
                      {authoritySql.id}
                    </Button>
                  </td>
                  <td>{authoritySql.name}</td>
                  <td>
                    {authoritySql.users
                      ? authoritySql.users.map((val, j) => (
                          <span key={j}>
                            {val.idUser}
                            {j === authoritySql.users.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${authoritySql.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${authoritySql.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${authoritySql.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ authoritySql }: IRootState) => ({
  authoritySqlList: authoritySql.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthoritySql);
