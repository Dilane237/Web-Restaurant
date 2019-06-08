import { Moment } from 'moment';

export interface IReservation {
  id?: number;
  name?: string;
  tables?: number;
  reservedAt?: Moment;
  reservationTime?: Moment;
}

export class Reservation implements IReservation {
  constructor(
    public id?: number,
    public name?: string,
    public tables?: number,
    public reservedAt?: Moment,
    public reservationTime?: Moment
  ) {}
}
