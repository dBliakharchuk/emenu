export interface IDish {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageContentType?: string;
  image?: any;
  categoryIdCategory?: string;
  categoryId?: number;
}

export const defaultValue: Readonly<IDish> = {};
