import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';

export interface IBillingMySuffix {
  id?: number;
  totalPrice?: number;
  status?: boolean;
  customer?: ICustomerMySuffix;
  command?: ICommandMySuffix;
}

export class BillingMySuffix implements IBillingMySuffix {
  constructor(
    public id?: number,
    public totalPrice?: number,
    public status?: boolean,
    public customer?: ICustomerMySuffix,
    public command?: ICommandMySuffix
  ) {
    this.status = this.status || false;
  }
}
