import { TestBed, inject } from '@angular/core/testing';

import { CardActionService } from './card-action.service';

describe('CardActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardActionService]
    });
  });

  it('should be created', inject([CardActionService], (service: CardActionService) => {
    expect(service).toBeTruthy();
  }));
});
