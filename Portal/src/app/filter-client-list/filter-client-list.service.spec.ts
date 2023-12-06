import { TestBed } from '@angular/core/testing';

import { FilterClientListService } from './filter-client-list.service';

describe('FilterClientListServiceService', () => {
  let service: FilterClientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterClientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
