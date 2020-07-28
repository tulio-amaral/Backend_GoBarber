// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list monthly availability of a given provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 5, 28, 16, 5, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 28, 16, 5, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 28, 17, 5, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 29, 16, 5, 0),
    });

    const availability = listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 27, available: true },
      { day: 28, available: false },
      { day: 29, available: false },
      { day: 30, available: true },
      { day: 31, available: true },
    ]));
  });
});
