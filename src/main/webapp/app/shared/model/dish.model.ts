import { ICategory } from 'app/shared/model/category.model';

export interface IDish {
  id?: number;
  idDish?: number;
  name?: string;
  description?: string;
  price?: number;
  category?: ICategory;
}

export const defaultValue: Readonly<IDish> = {};
