import { Dept } from './dept.entity';

describe('Dept', () => {
  it('should be defined', () => {
    expect(new Dept()).toBeDefined();
  });
});
