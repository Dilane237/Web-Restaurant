import { Moment } from 'moment';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

export interface ICommandMySuffix {
  id?: number;
  commandAt?: Moment;
  quantity?: number;
  serve?: boolean;
  customer?: ICustomerMySuffix;
  commands?: IMenuMySuffix[];
}

export class CommandMySuffix implements ICommandMySuffix {
  constructor(
    public id?: number,
    public commandAt?: Moment,
    public quantity?: number,
    public serve?: boolean,
    public customer?: ICustomerMySuffix,
    public commands?: IMenuMySuffix[]
  ) {
    this.serve = this.serve || false;
  }
}
