import {
  startOfHour, isBefore, getHours, format,
} from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


/**
 * [x] Recebimento das informacoes
 * [/] Tratativa de erros/execessoes
 * [/] Acesso ao repositorio
 */

interface IRequestDTO{
  provider_id: string;
  user_id: string;
  date: Date;
}
/**
 * Dependecy Inversion (SOLID)
 * S = Single Responsability Principle
 * O = Open Closed Principle
 * L= Liskov Substitution Principle
 * I = Interface Segregation Principle
 * D = Dependency Inversion Principle
 */

 @injectable()
class CreateAppointmentService {
   constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

   ) {}

   public async execute({ date, user_id, provider_id }: IRequestDTO): Promise<Appointment> {
     const appointmentDate = startOfHour(date);

     if (isBefore(appointmentDate, Date.now())) {
       throw new AppError("You can't create an appointment on a past date.");
     }

     if (user_id === provider_id) {
       throw new AppError("You can't create an appointment with yourself.");
     }

     if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
       throw new
       AppError('The establishment is closed. Appointments can only be book between 8 and 17');
     }

     const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
       appointmentDate,
     );

     if (findAppointmentInSameDate) {
       throw new AppError('This appointment is already booked');
     }
     const appointment = await this.appointmentsRepository.create({
       provider_id,
       user_id,
       date: appointmentDate,
     });

     const dayFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

     await this.notificationsRepository.create({
       recipient_id: provider_id,
       content: `Novo agendamento para ${dayFormatted}.`,
     });

     await this.cacheProvider.invalidate(
       `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`,
     );

     return appointment;
   }
 }

export default CreateAppointmentService;
