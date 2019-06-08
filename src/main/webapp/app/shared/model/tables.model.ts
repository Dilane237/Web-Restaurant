import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

export interface ITables {
  id?: number;
  placesAvailable?: number;
  isReserved?: boolean;
  user?: number;
  customers?: ICustomerMySuffix[];
  setting?: ISettingMySuffix;
}

export class Tables implements ITables {
  constructor(
    public id?: number,
    public placesAvailable?: number,
    public isReserved?: boolean,
    public user?: number,
    public customers?: ICustomerMySuffix[],
    public setting?: ISettingMySuffix
  ) {
    this.isReserved = this.isReserved || false;
  }
}
