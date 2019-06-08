import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITablesMySuffix } from 'app/shared/model/tables-my-suffix.model';

type EntityResponseType = HttpResponse<ITablesMySuffix>;
type EntityArrayResponseType = HttpResponse<ITablesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TablesMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/tables';

  constructor(protected http: HttpClient) {}

  create(tables: ITablesMySuffix): Observable<EntityResponseType> {
    return this.http.post<ITablesMySuffix>(this.resourceUrl, tables, { observe: 'response' });
  }

  update(tables: ITablesMySuffix): Observable<EntityResponseType> {
    return this.http.put<ITablesMySuffix>(this.resourceUrl, tables, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITablesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITablesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
