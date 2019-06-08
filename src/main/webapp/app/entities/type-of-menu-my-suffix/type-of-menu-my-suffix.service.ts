import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

type EntityResponseType = HttpResponse<ITypeOfMenuMySuffix>;
type EntityArrayResponseType = HttpResponse<ITypeOfMenuMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TypeOfMenuMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/type-of-menus';

  constructor(protected http: HttpClient) {}

  create(typeOfMenu: ITypeOfMenuMySuffix): Observable<EntityResponseType> {
    return this.http.post<ITypeOfMenuMySuffix>(this.resourceUrl, typeOfMenu, { observe: 'response' });
  }

  update(typeOfMenu: ITypeOfMenuMySuffix): Observable<EntityResponseType> {
    return this.http.put<ITypeOfMenuMySuffix>(this.resourceUrl, typeOfMenu, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeOfMenuMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeOfMenuMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
