import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface IBaseMenuProps {
  menuPointerPosition: number;
  categoryPointerPosition: number;
  categoryLabel: string;
  chosenRestaurantId: number;
}

export interface IBasePropsRestaurant {
  restaurantEnt: IRestaurant;
}
