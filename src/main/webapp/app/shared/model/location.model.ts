export interface ILocation {
  id?: number;
  addressGM?: string;
  country?: string;
  city?: string;
  street?: string;
  bilding?: string;
  postcode?: number;
}

export const defaultValue: Readonly<ILocation> = {};
