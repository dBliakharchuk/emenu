export interface IMenu {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  imageContent?: string;
  restaurantIdRestaurant?: string;
  restaurantId?: number;
}

export const defaultValue: Readonly<IMenu> = {};
