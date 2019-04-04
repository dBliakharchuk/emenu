export interface IDish {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  categoryIdCategory?: string;
  categoryId?: number;
}

export const defaultValue: Readonly<IDish> = {};
