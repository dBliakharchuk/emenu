export interface IRestaurant {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  idLocationId?: number;
  userIdUser?: string;
  userId?: number;
}

export const defaultValue: Readonly<IRestaurant> = {};
