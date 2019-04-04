export interface IRestaurant {
  id?: number;
  name?: string;
  description?: string;
  idLocationId?: number;
  userIdUser?: string;
  userId?: number;
}

export const defaultValue: Readonly<IRestaurant> = {};
