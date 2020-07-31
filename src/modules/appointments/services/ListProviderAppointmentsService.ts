import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('asa');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    await this.cacheProvider.save('asa', 'akira');

    return appointments;
  }
}

export default ListProvidersAppointmentsService;
