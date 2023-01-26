import { TestBed } from '@angular/core/testing';

import { UserContextService } from './user-context.service';
import { UserContextModule } from './../user-context.module';

describe('UserContextService', () => {
  let service: UserContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		imports: [
			UserContextModule
		]
	});
    service = TestBed.inject(UserContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
