import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFonctionMySuffix } from 'app/shared/model/fonction-my-suffix.model';

type EntityResponseType = HttpResponse<IFonctionMySuffix>;
type EntityArrayResponseType = HttpResponse<IFonctionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FonctionMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/fonctions';

  constructor(protected http: HttpClient) {}

  create(fonction: IFonctionMySuffix): Observable<EntityResponseType> {
    return this.http.post<IFonctionMySuffix>(this.resourceUrl, fonction, { observe: 'response' });
  }

  update(fonction: IFonctionMySuffix): Observable<EntityResponseType> {
    return this.http.put<IFonctionMySuffix>(this.resourceUrl, fonction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFonctionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFonctionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
