/* eslint-disable max-len */
import { uuid } from 'uuidv4';
import {
  isEqual, getMonth, getYear, getDate,
} from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';


class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) => isEqual(appointment.date, date)
    && appointment.provider_id === provider_id);
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id, month, year,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => appointment.provider_id === provider_id
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year);

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id, day, month, year,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => appointment.provider_id === provider_id
      && getDate(appointment.date) === day
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year);

    return appointments;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(), provider_id, user_id, date,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
