import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReservationMySuffix } from 'app/shared/model/reservation-my-suffix.model';

type EntityResponseType = HttpResponse<IReservationMySuffix>;
type EntityArrayResponseType = HttpResponse<IReservationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ReservationMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/reservations';

  constructor(protected http: HttpClient) {}

  create(reservation: IReservationMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservation);
    return this.http
      .post<IReservationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reservation: IReservationMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservation);
    return this.http
      .put<IReservationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReservationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReservationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reservation: IReservationMySuffix): IReservationMySuffix {
    const copy: IReservationMySuffix = Object.assign({}, reservation, {
      reservedAt: reservation.reservedAt != null && reservation.reservedAt.isValid() ? reservation.reservedAt.toJSON() : null,
      reservationTime:
        reservation.reservationTime != null && reservation.reservationTime.isValid() ? reservation.reservationTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reservedAt = res.body.reservedAt != null ? moment(res.body.reservedAt) : null;
      res.body.reservationTime = res.body.reservationTime != null ? moment(res.body.reservationTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reservation: IReservationMySuffix) => {
        reservation.reservedAt = reservation.reservedAt != null ? moment(reservation.reservedAt) : null;
        reservation.reservationTime = reservation.reservationTime != null ? moment(reservation.reservationTime) : null;
      });
    }
    return res;
  }
}
