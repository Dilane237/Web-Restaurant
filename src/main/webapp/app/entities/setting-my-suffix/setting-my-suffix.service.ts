import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISettingMySuffix } from 'app/shared/model/setting-my-suffix.model';

type EntityResponseType = HttpResponse<ISettingMySuffix>;
type EntityArrayResponseType = HttpResponse<ISettingMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SettingMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/settings';

  constructor(protected http: HttpClient) {}

  create(setting: ISettingMySuffix): Observable<EntityResponseType> {
    return this.http.post<ISettingMySuffix>(this.resourceUrl, setting, { observe: 'response' });
  }

  update(setting: ISettingMySuffix): Observable<EntityResponseType> {
    return this.http.put<ISettingMySuffix>(this.resourceUrl, setting, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISettingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISettingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
