export interface IIngredientToDish {
  id?: number;
  unit?: string;
  weight?: number;
  isMain?: boolean;
  isHidden?: boolean;
  toIngredientId?: number;
  toDishId?: number;
}

export const defaultValue: Readonly<IIngredientToDish> = {
  isMain: false,
  isHidden: false
};
