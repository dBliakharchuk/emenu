export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  menuIdMenu?: string;
  menuId?: number;
}

export const defaultValue: Readonly<ICategory> = {};
