import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canreadGuard } from './canread.guard';

describe('canreadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canreadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
