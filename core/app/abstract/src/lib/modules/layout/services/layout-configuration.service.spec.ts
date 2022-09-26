import { TestBed } from '@angular/core/testing';

import { LayoutConfigurationService } from './layout-configuration.service';

describe('LayoutConfigurationService', () => {
  let service: LayoutConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
