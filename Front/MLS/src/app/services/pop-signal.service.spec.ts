import { TestBed } from '@angular/core/testing';

import { PopSignalService } from './pop-signal.service';

describe('PopSignalService', () => {
  let service: PopSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
