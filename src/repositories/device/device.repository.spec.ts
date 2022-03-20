import { Test, TestingModule } from '@nestjs/testing';

import { DeviceRepository } from './device.repository';

describe('DeviceService', () => {
  let repository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRepository],
    }).compile();

    repository = module.get<DeviceRepository>(DeviceRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
