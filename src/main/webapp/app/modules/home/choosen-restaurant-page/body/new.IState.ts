import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface IBaseState {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
  chosenRestaurantId: number;
}

export interface IBaseProps {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
  chosenRestaurantId: number;
}

export interface IBasePropsRestaurant {
  restaurantEnt: IRestaurant;
}
