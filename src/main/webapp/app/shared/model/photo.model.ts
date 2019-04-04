export interface IPhoto {
  id?: number;
  title?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  restaurantIdRestaurant?: string;
  restaurantId?: number;
  dishIdDish?: string;
  dishId?: number;
}

export const defaultValue: Readonly<IPhoto> = {};
