import { TestBed } from '@angular/core/testing';

import { CustomFormValidationsService } from './custom-form-validations.service';

describe('CustomFormValidationsService', () => {
  let service: CustomFormValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFormValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
