import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

export interface ITypeOfMenuMySuffix {
  id?: number;
  name?: string;
  typesOfMenus?: IMenuMySuffix[];
}

export class TypeOfMenuMySuffix implements ITypeOfMenuMySuffix {
  constructor(public id?: number, public name?: string, public typesOfMenus?: IMenuMySuffix[]) {}
}
