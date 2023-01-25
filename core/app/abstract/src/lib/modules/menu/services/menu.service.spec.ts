import { TestBed } from '@angular/core/testing';
import { AppInfo, APP_INFO } from '../../app-info';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
			{ provide: APP_INFO, useValue: new AppInfo() }
		]
	});
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
