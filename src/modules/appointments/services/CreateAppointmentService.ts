import { startOfHour } from 'date-fns';
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

   public async execute({ date, provider_id }: IRequestDTO): Promise<Appointment> {
     const appointmentDate = startOfHour(date);

     const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
       appointmentDate,
     );

     if (findAppointmentInSameDate) {
       throw new AppError('This appointment is already booked');
     }
     const appointment = await this.appointmentsRepository.create({
       provider_id,
       date: appointmentDate,
     });

     return appointment;
   }
 }

export default CreateAppointmentService;
