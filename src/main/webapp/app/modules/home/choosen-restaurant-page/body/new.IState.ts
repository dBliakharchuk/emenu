import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface IBaseState {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
}

export interface IBaseProps {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
}

export interface IBasePropsRestaurant {
  restaurantEnt: IRestaurant;
}
