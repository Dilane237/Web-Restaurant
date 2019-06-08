import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMenuMySuffix } from 'app/shared/model/menu-my-suffix.model';

type EntityResponseType = HttpResponse<IMenuMySuffix>;
type EntityArrayResponseType = HttpResponse<IMenuMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MenuMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/menus';

  constructor(protected http: HttpClient) {}

  create(menu: IMenuMySuffix): Observable<EntityResponseType> {
    return this.http.post<IMenuMySuffix>(this.resourceUrl, menu, { observe: 'response' });
  }

  update(menu: IMenuMySuffix): Observable<EntityResponseType> {
    return this.http.put<IMenuMySuffix>(this.resourceUrl, menu, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMenuMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMenuMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
