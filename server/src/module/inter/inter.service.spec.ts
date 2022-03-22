import { Test, TestingModule } from '@nestjs/testing';
import { InterService } from './inter.service';

describe('InterService', () => {
  let service: InterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterService],
    }).compile();

    service = module.get<InterService>(InterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
