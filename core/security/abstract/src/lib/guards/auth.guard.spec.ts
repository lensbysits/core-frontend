import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationModule } from './../authentication.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
		imports: [
			AuthenticationModule
		]
	});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
