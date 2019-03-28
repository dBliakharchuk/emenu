import { IMenu } from 'app/shared/model/menu.model';

export interface ICategory {
  id?: number;
  idCategory?: number;
  name?: string;
  description?: string;
  menu?: IMenu;
}

export const defaultValue: Readonly<ICategory> = {};
