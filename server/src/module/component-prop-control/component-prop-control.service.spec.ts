import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropControlService } from './component-prop-control.service';

describe('ComponentPropControlService', () => {
  let service: ComponentPropControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentPropControlService],
    }).compile();

    service = module.get<ComponentPropControlService>(
      ComponentPropControlService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
