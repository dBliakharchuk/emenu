import 'app/modules/home/css/dish-style.css';

import React from 'react';
import { getDishEntities, getEntity } from 'app/entities/dish/dish.reducer';
import { RouteComponentProps } from 'react-router';
import { IBaseMenuProps } from 'app/modules/home/choosen-restaurant-page/body/new.IState';
import { connect } from 'react-redux';
import { IPaginationBaseState } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import Popup from 'reactjs-popup';

export interface IChosenDishProps extends StateProps, IBaseMenuProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export type IChosenDishState = IPaginationBaseState;

export class ChosenDish extends React.Component<IChosenDishProps, IChosenDishState> {
  constructor(props) {
    super(props);
    this.props.getEntity(this.props.match.params.id);
    this.props.getEntities();
  }

  componentDidMount(): void {
    this.props.getEntities();
  }

  render() {
    const { name, image, imageContentType } = this.props.dishEntity;
    let url = null;
    {
      url = image ? `data:${imageContentType};base64,${image}` : url;
    }
    return (
      <div>
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header"> {name} </div>
              <div className="content">
                {' '}
                <h1>I AM HERE</h1>
                <img src={url} alt={name} />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel
                eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio voluptatum sed eius cumque,
                delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
              </div>
              <div className="actions">
                <Popup trigger={<button className="button"> Trigger </button>} position="top center" closeOnDocumentClick>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime molestiae dolorem
                    numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
                  </span>
                </Popup>
                <button className="button" onClick={close}>
                  close modal
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ dish }: IRootState) => ({
  dishList: dish.entities,
  dishEntity: dish.entity
});

const mapDispatchToProps = {
  getEntities: getDishEntities,
  getEntity
};

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChosenDish);
