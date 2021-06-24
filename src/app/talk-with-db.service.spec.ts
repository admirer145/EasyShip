import { TestBed } from '@angular/core/testing';

import { TalkWithDbService } from './talk-with-db.service';

describe('TalkWithDbService', () => {
  let service: TalkWithDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalkWithDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
