import { Test, TestingModule } from '@nestjs/testing';
import { DemandUserService } from './demand-user.service';

describe('DemandUserService', () => {
  let service: DemandUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandUserService],
    }).compile();

    service = module.get<DemandUserService>(DemandUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
