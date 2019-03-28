import { Moment } from 'moment';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IDish } from 'app/shared/model/dish.model';

export interface IPhoto {
  id?: number;
  idPhoto?: number;
  title?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  height?: number;
  width?: number;
  taken?: Moment;
  uploaded?: Moment;
  restaurant?: IRestaurant;
  dish?: IDish;
}

export const defaultValue: Readonly<IPhoto> = {};
