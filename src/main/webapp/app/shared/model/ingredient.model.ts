export interface IIngredient {
  id?: number;
  name?: string;
  isAllergic?: boolean;
}

export const defaultValue: Readonly<IIngredient> = {
  isAllergic: false
};
