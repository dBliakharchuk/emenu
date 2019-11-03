export interface IRestaurant {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  googleMapsLink?: string;
  tripAdvisorLink?: string;
  webPageLink?: string;
  idLocationId?: number;
  userId?: number;
}

export const defaultValue: Readonly<IRestaurant> = {};
