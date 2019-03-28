import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './menu.reducer';
import { IMenu } from 'app/shared/model/menu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Menu extends React.Component<IMenuProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { menuList, match } = this.props;
    return (
      <div>
        <h2 id="menu-heading">
          <Translate contentKey="emenuApp.menu.home.title">Menus</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="emenuApp.menu.home.createLabel">Create new Menu</Translate>
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
                  <Translate contentKey="emenuApp.menu.idMenu">Id Menu</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.menu.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.menu.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.menu.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="emenuApp.menu.restaurant">Restaurant</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {menuList.map((menu, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${menu.id}`} color="link" size="sm">
                      {menu.id}
                    </Button>
                  </td>
                  <td>{menu.idMenu}</td>
                  <td>{menu.name}</td>
                  <td>{menu.description}</td>
                  <td>
                    {menu.image ? (
                      <div>
                        <a onClick={openFile(menu.imageContentType, menu.image)}>
                          <img src={`data:${menu.imageContentType};base64,${menu.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {menu.imageContentType}, {byteSize(menu.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{menu.restaurant ? <Link to={`restaurant/${menu.restaurant.id}`}>{menu.restaurant.idRestaurant}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${menu.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${menu.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${menu.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ menu }: IRootState) => ({
  menuList: menu.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
