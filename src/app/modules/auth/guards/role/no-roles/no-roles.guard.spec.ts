import { TestBed } from '@angular/core/testing';

import { NoRolesGuard } from './no-roles.guard';

describe('NoRolesGuard', () => {
  let guard: NoRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
