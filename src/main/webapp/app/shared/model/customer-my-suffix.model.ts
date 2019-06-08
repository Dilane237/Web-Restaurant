import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';
import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

export interface ICustomerMySuffix {
  id?: number;
  name?: string;
  commands?: ICommandMySuffix[];
  billings?: IBillingMySuffix[];
  tables?: ITablesMySuffix;
}

export class CustomerMySuffix implements ICustomerMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public commands?: ICommandMySuffix[],
    public billings?: IBillingMySuffix[],
    public tables?: ITablesMySuffix
  ) {}
}
