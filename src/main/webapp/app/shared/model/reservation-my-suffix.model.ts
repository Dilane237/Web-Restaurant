import { Moment } from 'moment';

export interface IReservationMySuffix {
  id?: number;
  name?: string;
  reservedAt?: Moment;
  reservationTime?: Moment;
}

export class ReservationMySuffix implements IReservationMySuffix {
  constructor(public id?: number, public name?: string, public reservedAt?: Moment, public reservationTime?: Moment) {}
}
