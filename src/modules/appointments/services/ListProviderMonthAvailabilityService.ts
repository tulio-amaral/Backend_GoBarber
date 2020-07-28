import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import User from '@modules/users/infra/typeorm/entities/User';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';


interface IRequest{
  provider_id: string;
  month: number;
  year: number;
}

/**
 * [ {day:1, available: false}, {day:2, available: true} ] z.B.
 */

 type IResponse = Array<{
   day: number;
   available: boolean;
 }>;

@injectable()
class ListProvidersMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    });
    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProvidersMonthAvailabilityService;
