import { TestBed } from '@angular/core/testing';

import { MenuReadService } from './menu-read.service';

describe('MenuReadService', () => {
  let service: MenuReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
