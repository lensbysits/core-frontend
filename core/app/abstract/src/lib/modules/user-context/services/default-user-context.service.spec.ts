import { TestBed } from '@angular/core/testing';

import { DefaultUserContextService } from './default-user-context.service';

describe('DefaultUserContextService', () => {
  let service: DefaultUserContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
			DefaultUserContextService
		]
	});
    service = TestBed.inject(DefaultUserContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
