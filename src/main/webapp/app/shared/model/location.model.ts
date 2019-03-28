export interface ILocation {
  id?: number;
  idLocation?: number;
  addressGM?: string;
  country?: string;
  city?: string;
  street?: string;
  bilding?: string;
  postcode?: string;
}

export const defaultValue: Readonly<ILocation> = {};
