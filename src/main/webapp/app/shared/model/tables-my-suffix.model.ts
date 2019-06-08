import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

export interface ITablesMySuffix {
  id?: number;
  placesAvailable?: number;
  isReserved?: boolean;
  user?: number;
  customers?: ICustomerMySuffix[];
  reservation?: IReservationMySuffix;
  setting?: ISettingMySuffix;
}

export class TablesMySuffix implements ITablesMySuffix {
  constructor(
    public id?: number,
    public placesAvailable?: number,
    public isReserved?: boolean,
    public user?: number,
    public customers?: ICustomerMySuffix[],
    public reservation?: IReservationMySuffix,
    public setting?: ISettingMySuffix
  ) {
    this.isReserved = this.isReserved || false;
  }
}
