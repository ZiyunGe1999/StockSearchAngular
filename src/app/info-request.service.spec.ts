import { TestBed } from '@angular/core/testing';

import { InfoRequestService } from './info-request.service';

describe('InfoRequestService', () => {
  let service: InfoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
