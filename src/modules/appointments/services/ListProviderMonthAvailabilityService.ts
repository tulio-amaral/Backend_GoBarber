import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

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
    const numberOfDaysInMonth = getDaysInMonth(
      new Date(year, month - 1),
    );

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter((appointment) => getDate(appointment.date) === day);
      return {
        available: appointmentsInDay.length < 10,
        day,
      };
    });


    return availability;
  }
}

export default ListProvidersMonthAvailabilityService;
