import { Test, TestingModule } from '@nestjs/testing';
import { ComponentStatService } from './component-stat.service';

describe('ComponentStatService', () => {
  let service: ComponentStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentStatService],
    }).compile();

    service = module.get<ComponentStatService>(ComponentStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
