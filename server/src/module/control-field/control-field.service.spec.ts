import { Test, TestingModule } from '@nestjs/testing';
import { ControlFieldService } from './control-field.service';

describe('ControlFieldService', () => {
  let service: ControlFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlFieldService],
    }).compile();

    service = module.get<ControlFieldService>(ControlFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
