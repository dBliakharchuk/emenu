import { IUser } from 'app/shared/model/user.model';

export interface IAuthoritySql {
  id?: number;
  name?: string;
  users?: IUser[];
}

export const defaultValue: Readonly<IAuthoritySql> = {};
