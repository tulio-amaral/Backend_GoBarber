import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsRepository{
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment|undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
      data: IFindAllInDayProviderDTO
    ): Promise<Appointment[]>;
}
