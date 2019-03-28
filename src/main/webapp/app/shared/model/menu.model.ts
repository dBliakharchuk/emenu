import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface IMenu {
  id?: number;
  idMenu?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  restaurant?: IRestaurant;
}

export const defaultValue: Readonly<IMenu> = {};
