import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest{
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

/**
 * [ {day:1, available: false}, {day:2, available: true} ] z.B.
 */


@injectable()
class ListProvidersAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    return appointments;
  }
}

export default ListProvidersAppointmentsService;
