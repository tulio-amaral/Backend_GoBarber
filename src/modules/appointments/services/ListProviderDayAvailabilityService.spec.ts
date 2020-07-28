// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list daily availability of a given provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 28, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 28, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 6, 28, 11).getTime());

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
      day: 28,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]));
  });
});
