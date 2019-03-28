import { ILocation } from 'app/shared/model/location.model';
import { IUser } from 'app/shared/model/user.model';

export interface IRestaurant {
  id?: number;
  idRestaurant?: number;
  name?: string;
  description?: string;
  location?: ILocation;
  user?: IUser;
}

export const defaultValue: Readonly<IRestaurant> = {};
