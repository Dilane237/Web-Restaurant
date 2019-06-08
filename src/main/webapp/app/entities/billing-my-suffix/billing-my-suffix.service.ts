import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBillingMySuffix } from 'app/shared/model/billing-my-suffix.model';

type EntityResponseType = HttpResponse<IBillingMySuffix>;
type EntityArrayResponseType = HttpResponse<IBillingMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class BillingMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/billings';

  constructor(protected http: HttpClient) {}

  create(billing: IBillingMySuffix): Observable<EntityResponseType> {
    return this.http.post<IBillingMySuffix>(this.resourceUrl, billing, { observe: 'response' });
  }

  update(billing: IBillingMySuffix): Observable<EntityResponseType> {
    return this.http.put<IBillingMySuffix>(this.resourceUrl, billing, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBillingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
