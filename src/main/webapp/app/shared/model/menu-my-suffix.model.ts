import { ICommandMySuffix } from 'app/shared/model/command-my-suffix.model';
import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

export interface IMenuMySuffix {
  id?: number;
  name?: string;
  image?: string;
  price?: number;
  command?: ICommandMySuffix;
  typeOfMenu?: ITypeOfMenuMySuffix;
}

export class MenuMySuffix implements IMenuMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public image?: string,
    public price?: number,
    public command?: ICommandMySuffix,
    public typeOfMenu?: ITypeOfMenuMySuffix
  ) {}
}
