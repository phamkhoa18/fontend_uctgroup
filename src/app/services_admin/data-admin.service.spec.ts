import { TestBed } from '@angular/core/testing';

import { DataAdminService } from './data-admin.service';

describe('DataAdminService', () => {
  let service: DataAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
