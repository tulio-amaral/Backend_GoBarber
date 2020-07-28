import { injectable, inject } from 'tsyringe';
// import { getDaysInMonth, getDate } from 'date-fns';

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

 type IResponse = Array<{
   hour: number;
   available: boolean;
 }>;

@injectable()
class ListProvidersDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    return [{ hour: 8, available: true }];
  }
}

export default ListProvidersDayAvailabilityService;
