import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

export interface ISettingMySuffix {
  id?: number;
  restaurantName?: string;
  numberOfTable?: number;
  address?: string;
  phoneNumber?: string;
  numberPersonTable?: number;
  tables?: ITablesMySuffix[];
}

export class SettingMySuffix implements ISettingMySuffix {
  constructor(
    public id?: number,
    public restaurantName?: string,
    public numberOfTable?: number,
    public address?: string,
    public phoneNumber?: string,
    public numberPersonTable?: number,
    public tables?: ITablesMySuffix[]
  ) {}
}
