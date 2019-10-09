import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IIngredientToDish } from 'app/shared/model/ingredient-to-dish.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './ingredient-to-dish.reducer';

export interface IIngredientToDishDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IngredientToDishDeleteDialog extends React.Component<IIngredientToDishDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.ingredientToDishEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { ingredientToDishEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="emenuApp.ingredientToDish.delete.question">
          <Translate contentKey="emenuApp.ingredientToDish.delete.question" interpolate={{ id: ingredientToDishEntity.id }}>
            Are you sure you want to delete this IngredientToDish?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-ingredientToDish" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ ingredientToDish }: IRootState) => ({
  ingredientToDishEntity: ingredientToDish.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientToDishDeleteDialog);
