import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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

     return appointment;
   }
 }

export default CreateAppointmentService;
