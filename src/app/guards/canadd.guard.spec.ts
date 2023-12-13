import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canaddGuard } from './canadd.guard';

describe('canaddGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canaddGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
